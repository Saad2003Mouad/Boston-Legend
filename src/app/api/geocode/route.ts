import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const googleKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  try {
    // 1. Prioritize Google Maps Geocoding if API key is provided
    if (googleKey) {
      if (action === "reverse") {
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");
        if (!lat || !lon) return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });

        try {
          const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleKey}`;
          const gRes = await fetch(googleUrl, { signal: AbortSignal.timeout(5000), cache: "no-store" });
          if (gRes.ok) {
            const gData = await gRes.json();
            if (gData.status === "OK" && gData.results?.length > 0) {
              const item = gData.results[0];
              const comps: any[] = item.address_components || [];
              const getComp = (type: string) => comps.find((c: any) => c.types.includes(type))?.long_name || "";

              const response = NextResponse.json({
                address: {
                  house_number: getComp("street_number"),
                  road: getComp("route"),
                  city: getComp("locality") || getComp("sublocality") || getComp("postal_town") || "",
                  county: getComp("administrative_area_level_2"),
                  state: getComp("administrative_area_level_1") || "Massachusetts",
                  postcode: getComp("postal_code"),
                },
                display_name: item.formatted_address,
              });
              response.headers.set("Cache-Control", "public, max-age=120, stale-while-revalidate=600");
              return response;
            }
          }
        } catch (err) {
          console.warn("[geocode] Google reverse geocode failed, trying fallback:", err);
        }
      } else if (action === "search") {
        const q = searchParams.get("q");
        if (!q) return NextResponse.json([], { status: 200 });

        try {
          const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(q)}&components=country:US|administrative_area:MA&key=${googleKey}`;
          const gRes = await fetch(googleUrl, { signal: AbortSignal.timeout(5000), cache: "no-store" });
          if (gRes.ok) {
            const gData = await gRes.json();
            if (gData.status === "OK" && gData.results?.length > 0) {
              const transformed = gData.results.map((item: any, index: number) => {
                const comps: any[] = item.address_components || [];
                const getComp = (type: string) => comps.find((c: any) => c.types.includes(type))?.long_name || "";
                return {
                  place_id: item.place_id || index,
                  display_name: item.formatted_address,
                  lat: String(item.geometry.location.lat),
                  lon: String(item.geometry.location.lng),
                  address: {
                    house_number: getComp("street_number"),
                    road: getComp("route"),
                    city: getComp("locality") || getComp("sublocality") || getComp("postal_town") || "",
                    county: getComp("administrative_area_level_2"),
                    state: getComp("administrative_area_level_1") || "Massachusetts",
                    postcode: getComp("postal_code"),
                  },
                };
              });

              const response = NextResponse.json(transformed);
              response.headers.set("Cache-Control", "public, max-age=120, stale-while-revalidate=600");
              return response;
            }
          }
        } catch (err) {
          console.warn("[geocode] Google search geocode failed, trying fallback:", err);
        }
      }
    }

    // 2. OpenStreetMap / Nominatim Fallback
    let url = "";
    if (action === "search") {
      const q = searchParams.get("q");
      if (!q) return NextResponse.json([], { status: 200 });
      url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&addressdetails=1&limit=5&countrycodes=us`;
    } else if (action === "reverse") {
      const lat = searchParams.get("lat");
      const lon = searchParams.get("lon");
      if (!lat || !lon) return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
      url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&zoom=18`;
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        "Accept-Language": "en",
        "User-Agent": "BostonLegendIceCreamTruck/2.0 (info@bostonlegendicecreamtruck.com)",
        "Referer": "https://bostonlegendicecreamtruck.com",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`[geocode] Nominatim returned ${res.status} for action=${action}`);
      if (action === "reverse") {
        return NextResponse.json({ address: {}, display_name: "" }, { status: 200 });
      }
      return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();
    const response = NextResponse.json(data);
    response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    return response;

  } catch (error: any) {
    console.error("[geocode] Proxy Error:", error?.message);
    if (action === "reverse") {
      return NextResponse.json({ address: {}, display_name: "" }, { status: 200 });
    }
    return NextResponse.json([], { status: 200 });
  }
}
