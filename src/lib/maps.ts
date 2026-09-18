/**
 * Maps Service Layer — Phase 1: OpenStreetMap / Nominatim
 * Upgrade path: swap implementation to Google Maps API
 */

export const BASE_LOCATION = { lat: 42.3551, lng: -71.0657, label: "Boston, MA 02108" };
const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";

const SUPPORTED_REGIONS = [
  "Abington", "Allston", "Andover", "Arlington", "Avon", "Barnstable", "Bedford", "Belmont", "Billerica", "Boston", "Braintree", "Brewster", "Bridgewater", "Brighton", "Brookline", "Burlington", "Cambridge", "Cape Cod", "Carver", "Charlestown", "Chatham", "Chelmsford", "Clinton", "Cohasset", "Concord", "Danvers", "Dedham", "Dennis", "Dorchester", "Dover", "Dracut", "Duxbury", "East Boston", "Erving", "Essex", "Everett", "Falmouth", "Foxborough", "Framingham", "Franklin", "Freetown", "Georgetown", "Gloucester", "Greater Boston area", "Groton", "Halifax", "Hamilton", "Hancock", "Hanover", "Hanson", "Harwich", "Haverhill", "Hingham", "Holbrook", "Holliston", "Hopkinton", "Hudson", "Hull", "Ipswich", "Jamaica Plain", "Kingston", "Lancaster", "Lawrence", "Leominster", "Lexington", "Lincoln", "Littleton", "Lowell", "Lynn", "Lynnfield", "Malden", "Manchester-by-the-Sea", "Mansfield", "Marblehead", "Marlborough", "Marshfield", "Mashpee", "Maynard", "Medford", "Melrose", "Merrimac", "Middleborough", "Milford", "Millis", "Milton", "Nahant", "Natick", "Needham", "Newbury", "Newburyport", "Newton", "Norfolk", "North Andover", "North Attleboro", "Northborough", "North Reading", "North Shore", "Norwell", "Norwood", "Peabody", "Pembroke", "Pepperell", "Plymouth", "Quincy", "Randolph", "Raynham", "Reading", "Revere", "Rockland", "Rockport", "Rowley", "Salem", "Salisbury", "Sandwich", "Saugus", "Scituate", "Sharon", "Sherborn", "Shirley", "Shrewsbury", "Somerville", "Southborough", "South Boston", "South End", "South Shore", "Stoneham", "Stoughton", "Sudbury", "Swampscott", "Taunton", "Tewksbury", "Topsfield", "Wakefield", "Waltham", "Watertown", "Wayland", "Wellesley", "Westfield", "Westford", "Weston", "West Roxbury", "Westwood", "Weymouth", "Wilmington", "Woburn", "Yarmouth"
];

export function isServiceableRegion(city: string): boolean {
  if (!city) return false;
  const normalized = city.toLowerCase().trim();
  return SUPPORTED_REGIONS.some(r => normalized.includes(r.toLowerCase()) || r.toLowerCase().includes(normalized));
}

export interface GeoResult {
  lat: number;
  lng: number;
  displayName: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface DistanceResult {
  straightMiles: number;
  drivingMiles: number;   // estimated: straight × 1.35
  billableMiles: number;  // max(0, drivingMiles - FREE_MILES)
  travelFee: number;
}

/** Geocode an address string → coordinates */
export async function geocodeAddress(address: string): Promise<GeoResult | null> {
  const googleKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (googleKey) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address + ", MA, USA")}&components=country:US|administrative_area:MA&key=${googleKey}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (res.ok) {
        const data = await res.json();
        if (data.status === "OK" && data.results?.length > 0) {
          const item = data.results[0];
          const comps: any[] = item.address_components || [];
          const getComp = (type: string) => comps.find((c: any) => c.types.includes(type))?.long_name || "";
          const getShort = (type: string) => comps.find((c: any) => c.types.includes(type))?.short_name || "";
          return {
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
            displayName: item.formatted_address,
            city: getComp("locality") || getComp("sublocality") || getComp("postal_town") || "",
            state: getShort("administrative_area_level_1") || "MA",
            zip: getComp("postal_code") || "",
            country: getShort("country") || "US",
          };
        }
      }
    } catch (e) {
      console.warn("Google geocode failed, using Nominatim fallback:", e);
    }
  }

  try {
    const params = new URLSearchParams({
      q: address + ", Massachusetts, USA",
      format: "json",
      addressdetails: "1",
      limit: "1",
      countrycodes: "us",
    });
    const res = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
      headers: { "User-Agent": "BostonLegendIceCreamTruck/1.0" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.length) return null;
    const item = data[0];
    const addr = item.address ?? {};
    return {
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      displayName: item.display_name,
      city: addr.city ?? addr.town ?? addr.village ?? addr.suburb ?? "",
      state: addr.state ?? "",
      zip: addr.postcode ?? "",
      country: addr.country_code ?? "",
    };
  } catch { return null; }
}

/** Search suggestions for address autocomplete */
export async function searchAddresses(query: string): Promise<{ label: string; value: string; lat: number; lng: number; zip: string; city: string }[]> {
  if (query.length < 3) return [];
  try {
    const params = new URLSearchParams({
      q: query + ", Massachusetts, USA",
      format: "json",
      addressdetails: "1",
      limit: "5",
      countrycodes: "us",
    });
    const res = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
      headers: { "User-Agent": "BostonLegendIceCreamTruck/1.0" },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data as any[]).map(item => ({
      label: item.display_name,
      value: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      zip: item.address?.postcode ?? "",
      city: item.address?.city ?? item.address?.town ?? item.address?.suburb ?? "",
    })).filter(i => i.lat && i.lng);
  } catch { return []; }
}

/** Haversine distance in miles */
export function haversineDistanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export interface RoutingProvider {
  getDrivingDistanceMiles(originLat: number, originLng: number, destLat: number, destLng: number): Promise<number>;
}

/**
 * Validates that coordinates are within a reasonable range for Massachusetts service area.
 * MA bounding box roughly: lat 41.0–43.0, lng -73.5–-69.5
 * We use a generous buffer to allow nearby states.
 */
function isValidMACoordinate(lat: number, lng: number): boolean {
  if (!lat || !lng) return false;
  if (lat === 0 && lng === 0) return false; // Null Island
  if (Math.abs(lat) < 1 && Math.abs(lng) < 1) return false; // Near 0,0
  // Generous Northeast US bounding box
  if (lat < 39 || lat > 45) return false;
  if (lng < -76 || lng > -68) return false;
  return true;
}

export class OSRMRoutingProvider implements RoutingProvider {
  async getDrivingDistanceMiles(originLat: number, originLng: number, destLat: number, destLng: number): Promise<number> {
    // Validate coordinates before making the request
    if (!isValidMACoordinate(originLat, originLng) || !isValidMACoordinate(destLat, destLng)) {
      console.error(`OSRM: Invalid coordinates — origin=(${originLat},${originLng}), dest=(${destLat},${destLng}). Rejecting.`);
      throw new Error(`Invalid coordinates: origin=(${originLat},${originLng}), dest=(${destLat},${destLng})`);
    }

    // The user requested EXACT driving distance.
    // We will race two different free public OSRM servers to get the fastest possible response.
    const url1 = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${originLng},${originLat};${destLng},${destLat}?overview=false`;
    const url2 = `https://router.project-osrm.org/route/v1/driving/${originLng},${originLat};${destLng},${destLat}?overview=false`;
    
    try {
      const fetchRoute = async (url: string) => {
        const res = await fetch(url, {
          headers: { "User-Agent": "BostonLegendIceCreamTruck/1.0 (info@bostonlegendicecream.com)" },
          signal: AbortSignal.timeout(8000),
          cache: "no-store"
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.code === "Ok" && data.routes && data.routes.length > 0) {
          return data.routes[0].distance * 0.000621371; // Convert meters to miles
        }
        throw new Error("No route found");
      };

      // Race both servers, whichever answers first with a valid route wins!
      const miles = await Promise.any([fetchRoute(url1), fetchRoute(url2)]);

      // Sanity check: driving distance should never be insanely larger than straight-line
      const straight = haversineDistanceMiles(originLat, originLng, destLat, destLng);
      if (miles > straight * 3 && miles > 100) {
        console.warn(`OSRM returned suspicious distance: ${miles.toFixed(1)} miles (straight=${straight.toFixed(1)}). Using fallback.`);
        return straight * 1.35;
      }
      return miles;
    } catch (e) {
      console.warn("Both OSRM servers failed (using fallback):", (e as Error).message);
      // Absolute fallback if both servers are down
      return haversineDistanceMiles(originLat, originLng, destLat, destLng) * 1.35;
    }
  }
}

export class GoogleMapsRoutingProvider implements RoutingProvider {
  private apiKey: string;
  private osrmFallback = new OSRMRoutingProvider();

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getDrivingDistanceMiles(originLat: number, originLng: number, destLat: number, destLng: number): Promise<number> {
    if (!isValidMACoordinate(originLat, originLng) || !isValidMACoordinate(destLat, destLng)) {
      throw new Error(`Invalid coordinates: origin=(${originLat},${originLng}), dest=(${destLat},${destLng})`);
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destLat},${destLng}&key=${this.apiKey}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(7000), cache: "no-store" });
      if (!res.ok) throw new Error(`Google Distance Matrix HTTP ${res.status}`);
      const data = await res.json();
      
      if (data.status === "OK" && data.rows?.[0]?.elements?.[0]?.status === "OK") {
        const meters = data.rows[0].elements[0].distance.value;
        return meters * 0.000621371; // Convert meters to miles
      }
      throw new Error(`Google Distance Matrix element status: ${data.status} / ${data.rows?.[0]?.elements?.[0]?.status}`);
    } catch (e) {
      console.warn("Google Distance Matrix failed, using OSRM fallback:", (e as Error).message);
      return this.osrmFallback.getDrivingDistanceMiles(originLat, originLng, destLat, destLng);
    }
  }
}

// Current Active Provider: Google Maps Distance Matrix if key exists, otherwise OSRM
const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
export const routingProvider: RoutingProvider = googleMapsKey
  ? new GoogleMapsRoutingProvider(googleMapsKey)
  : new OSRMRoutingProvider();

/** Calculate travel distance and fee from base to destination */
export async function calcDistance(destLat: number, destLng: number, freeMiles = 10, ratePerMile = 2.50, originLat = BASE_LOCATION.lat, originLng = BASE_LOCATION.lng): Promise<DistanceResult> {
  // Guard: reject invalid destination coordinates
  if (!isValidMACoordinate(destLat, destLng)) {
    console.error(`calcDistance: Invalid destination coordinates (${destLat}, ${destLng}). Returning zero.`);
    return { straightMiles: 0, drivingMiles: 0, billableMiles: 0, travelFee: 0 };
  }

  const straight = haversineDistanceMiles(originLat, originLng, destLat, destLng);
  const driving  = await routingProvider.getDrivingDistanceMiles(originLat, originLng, destLat, destLng);

  // Final sanity: cap at 200 miles (furthest MA point is ~180 miles from any other MA point)
  const safeDriving = Math.min(driving, 200);
  const billable = Math.max(0, safeDriving - freeMiles);

  return {
    straightMiles: Math.round(straight * 10) / 10,
    drivingMiles:  Math.round(safeDriving * 10) / 10,
    billableMiles: Math.round(billable * 10) / 10,
    travelFee:     Math.round(billable * ratePerMile * 100) / 100,
  };
}

/** Reverse geocode coordinates → address */
export async function reverseGeocode(lat: number, lng: number): Promise<GeoResult | null> {
  const googleKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (googleKey) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleKey}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (res.ok) {
        const data = await res.json();
        if (data.status === "OK" && data.results?.length > 0) {
          const item = data.results[0];
          const comps: any[] = item.address_components || [];
          const getComp = (type: string) => comps.find((c: any) => c.types.includes(type))?.long_name || "";
          const getShort = (type: string) => comps.find((c: any) => c.types.includes(type))?.short_name || "";
          return {
            lat, lng,
            displayName: item.formatted_address,
            city: getComp("locality") || getComp("sublocality") || getComp("postal_town") || "",
            state: getShort("administrative_area_level_1") || "MA",
            zip: getComp("postal_code") || "",
            country: getShort("country") || "US",
          };
        }
      }
    } catch (e) {
      console.warn("Google reverse geocode failed, using Nominatim fallback:", e);
    }
  }

  try {
    const params = new URLSearchParams({ lat: String(lat), lon: String(lng), format: "json", addressdetails: "1" });
    const res = await fetch(`${NOMINATIM_BASE}/reverse?${params}`, {
      headers: { "User-Agent": "BostonLegendIceCreamTruck/1.0" },
    });
    if (!res.ok) return null;
    const item = await res.json();
    const addr = item.address ?? {};
    return {
      lat, lng,
      displayName: item.display_name,
      city: addr.city ?? addr.town ?? addr.village ?? addr.suburb ?? "",
      state: addr.state ?? "",
      zip: addr.postcode ?? "",
      country: addr.country_code ?? "",
    };
  } catch { return null; }
}
