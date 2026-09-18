import { NextResponse } from "next/server";
// @ts-ignore
import zipcodes from "zipcodes";
import prisma from "@/lib/prisma";
import { routingProvider, BASE_LOCATION } from "@/lib/maps";

const FREE_MILES = 0;
const COST_PER_MILE = 2.00;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");
  
  const originLatParam = searchParams.get("originLat");
  const originLngParam = searchParams.get("originLng");
  const freeMilesParam = searchParams.get("freeMiles");

  if (!zip && (!latParam || !lngParam)) {
    return NextResponse.json({ error: "Missing ZIP code or coordinates" }, { status: 400 });
  }

  let destLat = latParam ? parseFloat(latParam) : null;
  let destLng = lngParam ? parseFloat(lngParam) : null;
  let destCity = "Selected Location";
  let destState = "MA";
  let destZip = zip || "";

  const effectiveOriginLat = originLatParam ? parseFloat(originLatParam) : BASE_LOCATION.lat;
  const effectiveOriginLng = originLngParam ? parseFloat(originLngParam) : BASE_LOCATION.lng;
  const effectiveFreeMiles = freeMilesParam !== null ? parseFloat(freeMilesParam) : FREE_MILES;

  if (zip) {
    const lookup = zipcodes.lookup(zip);
    const dbZip = await prisma.serviceZipCode.findUnique({ where: { zip } });
    
    // Accept if it's in our DB or if it's a valid Massachusetts zip code
    if (dbZip || (lookup && lookup.state === "MA")) {
      // Auto-heal DB: If it's valid MA but missing from DB, we can add it (optional, skipped for speed)
      if (lookup) {
        if (!destLat || !destLng) {
          destLat = lookup.latitude;
          destLng = lookup.longitude;
        }
        destCity = lookup.city;
        destState = lookup.state;
      } else if (dbZip) {
        // It's in our DB but zipcodes library doesn't have it (very rare, usually new zips).
        // If we don't have lat/lng from frontend, we fallback to Boston center so we don't block them.
        destCity = dbZip.city;
        destState = "MA";
        if (!destLat || !destLng) {
          destLat = BASE_LOCATION.lat;
          destLng = BASE_LOCATION.lng;
        }
      }
    } else if (!destLat || !destLng) {
      // If it's not in MA and not in DB, and no coordinates, we reject.
      return NextResponse.json({ error: "Sorry, we currently only serve Massachusetts." }, { status: 400 });
    }
  }

  let distanceMiles = 0;

  if (destLat && destLng) {
    distanceMiles = await routingProvider.getDrivingDistanceMiles(effectiveOriginLat, effectiveOriginLng, destLat, destLng);
  }
  
  distanceMiles = Math.round(distanceMiles * 10) / 10;

  let fee = 0;
  if (distanceMiles > effectiveFreeMiles) {
    fee = (distanceMiles - effectiveFreeMiles) * COST_PER_MILE;
  }

  return NextResponse.json({
    zip: destZip,
    city: destCity,
    state: destState,
    distance: distanceMiles,
    fee: Number(fee.toFixed(2)),
    freeMiles: effectiveFreeMiles,
    costPerMile: COST_PER_MILE,
    method: "routing-provider"
  });
}
