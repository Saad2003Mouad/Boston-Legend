"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Search, Loader2, X, Navigation, GripVertical, LocateFixed, Edit3, Map as MapIcon, Home } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Nominatim result type
interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
    county?: string;
  };
}

interface LocationPickerProps {
  address: string;
  onAddressChange: (address: string) => void;
  onLocationSelect: (data: {
    address: string;
    city: string;
    zip: string;
    lat: number;
    lng: number;
  }) => void;
}

export default function LocationPicker({
  address,
  onAddressChange,
  onLocationSelect,
}: LocationPickerProps) {
  const [query, setQuery] = useState(address);
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    display: string;
    street: string;
    city: string;
    zip: string;
  } | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [manualZip, setManualZip] = useState("");
  const [locating, setLocating] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const initializingRef = useRef(false);
  const isGoogleMapRef = useRef(false);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Initialize Map (Google Maps first, Leaflet fallback)
  useEffect(() => {
    if (initializingRef.current) return;
    initializingRef.current = true;
    let destroyed = false;

    const initMap = async () => {
      if (!mapContainerRef.current) return;
      const container = mapContainerRef.current as HTMLElement;

      const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

      // 1. TRY GOOGLE MAPS FIRST IF API KEY IS PRESENT
      if (googleApiKey) {
        try {
          const loadGoogle = (): Promise<any> => {
            if (typeof window !== "undefined" && (window as any).google?.maps) {
              return Promise.resolve((window as any).google.maps);
            }
            return new Promise((resolve, reject) => {
              const existing = document.getElementById("google-maps-sdk");
              if (existing) {
                existing.addEventListener("load", () => resolve((window as any).google?.maps));
                existing.addEventListener("error", reject);
                if ((window as any).google?.maps) resolve((window as any).google.maps);
                return;
              }
              const script = document.createElement("script");
              script.id = "google-maps-sdk";
              script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places,geometry`;
              script.async = true;
              script.defer = true;
              script.onload = () => resolve((window as any).google?.maps);
              script.onerror = reject;
              document.head.appendChild(script);
            });
          };

          const gMaps = await loadGoogle();
          if (destroyed || !mapContainerRef.current) return;

          const defaultCenter = { lat: 42.3601, lng: -71.0589 };

          const gMap = new gMaps.Map(container, {
            center: defaultCenter,
            zoom: 11,
            gestureHandling: "greedy",
            mapTypeControl: true,
            mapTypeControlOptions: {
              style: gMaps.MapTypeControlStyle.DROPDOWN_MENU,
              position: gMaps.ControlPosition.TOP_RIGHT,
            },
            zoomControl: true,
            zoomControlOptions: {
              position: gMaps.ControlPosition.RIGHT_BOTTOM,
            },
            streetViewControl: false,
            fullscreenControl: false,
            styles: [
              {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }]
              },
              {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
              }
            ]
          });

          // HQ Marker for American Legend
          const hqPosition = { lat: 42.7351, lng: -70.9856 }; // Georgetown
          new gMaps.Marker({
            position: hqPosition,
            map: gMap,
            title: "American Legend HQ (01833)",
            icon: {
              url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="20" fill="#071B3A" stroke="#ffffff" stroke-width="3"/>
                  <text x="22" y="27" font-size="18" text-anchor="middle">🍦</text>
                </svg>
              `),
              scaledSize: new gMaps.Size(44, 44),
              anchor: new gMaps.Point(22, 22),
            },
          });

          // Draggable Customer Marker
          const gMarker = new gMaps.Marker({
            position: defaultCenter,
            map: gMap,
            draggable: true,
            animation: gMaps.Animation.DROP,
            title: "Your Event Location",
            icon: {
              url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
                  <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.3"/>
                    </filter>
                  </defs>
                  <path d="M20 0C9 0 0 9 0 20C0 34 20 50 20 50C20 50 40 34 40 20C40 9 31 0 20 0Z" fill="#C9232D" stroke="#ffffff" stroke-width="2.5" filter="url(#shadow)"/>
                  <circle cx="20" cy="19" r="8" fill="#ffffff"/>
                  <circle cx="20" cy="19" r="4.5" fill="#C9232D"/>
                </svg>
              `),
              scaledSize: new gMaps.Size(40, 50),
              anchor: new gMaps.Point(20, 50),
            },
          });

          gMarker.addListener("dragstart", () => {
            setIsDragging(true);
          });

          gMarker.addListener("dragend", async (e: any) => {
            setIsDragging(false);
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            await reverseGeocode(lat, lng);
          });

          gMap.addListener("click", async (e: any) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            gMarker.setPosition({ lat, lng });
            await reverseGeocode(lat, lng);
          });

          mapInstanceRef.current = gMap;
          markerRef.current = gMarker;
          isGoogleMapRef.current = true;
          setMapReady(true);
          return;
        } catch (err) {
          console.warn("Failed to load Google Maps JS, falling back to Leaflet:", err);
        }
      }

      // 2. FALLBACK TO LEAFLET IF NO KEY OR FAILED
      try {
        const L = (await import("leaflet")).default;
        if (destroyed || !mapContainerRef.current) return;

        if ((container as any)._leaflet_id) {
          (container as any)._leaflet_id = null;
        }
        if (mapInstanceRef.current && !isGoogleMapRef.current) {
          mapInstanceRef.current.remove();
        }

        const defaultCenter: [number, number] = [42.3601, -71.0589];
        const map = L.map(container, {
          center: defaultCenter,
          zoom: 10,
          zoomControl: false,
          attributionControl: false,
        });

        L.control.zoom({ position: "bottomright" }).addTo(map);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap',
        }).addTo(map);

        const markerIcon = L.divIcon({
          className: "custom-leaflet-icon",
          html: `<div style="background:linear-gradient(135deg,#FF6B6B,#FF8F8F);border-radius:50% 50% 50% 0;width:40px;height:40px;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(255,107,107,0.6);border:3px solid white;animation:bounce-in 0.5s ease-out;"><span style="transform:rotate(45deg);font-size:16px;">📍</span></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        });

        const homeCenter: [number, number] = [42.3588, -71.0638];
        const homeIcon = L.divIcon({
          className: "custom-leaflet-icon",
          html: `<div style="background:linear-gradient(135deg,#071B3A,#2C1A10);color:#C99A3D;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 8px 24px rgba(26,16,9,0.5);border:3px solid white;">🍦</div>`,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });

        L.marker(homeCenter, { icon: homeIcon }).addTo(map).bindTooltip("American Legend (01833)", { permanent: true, direction: "right" });

        const marker = L.marker(defaultCenter, {
          icon: markerIcon,
          draggable: true,
        }).addTo(map);

        marker.on("dragstart", () => setIsDragging(true));
        marker.on("dragend", async () => {
          setIsDragging(false);
          const pos = marker.getLatLng();
          await reverseGeocode(pos.lat, pos.lng);
        });

        map.on("click", async (e: any) => {
          const { lat, lng } = e.latlng;
          marker.setLatLng([lat, lng]);
          await reverseGeocode(lat, lng);
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;
        isGoogleMapRef.current = false;
        setMapReady(true);
      } catch (e) {
        console.error("Leaflet init error:", e);
      }
    };

    initMap();

    return () => {
      destroyed = true;
      initializingRef.current = false;
      if (mapInstanceRef.current) {
        if (!isGoogleMapRef.current && typeof mapInstanceRef.current.remove === "function") {
          mapInstanceRef.current.remove();
        }
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Reverse geocode a lat/lng to get the address — via server proxy to avoid browser blocking
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`/api/geocode?action=reverse&lat=${lat}&lon=${lng}`);
      if (!res.ok) throw new Error("Geocoding failed");
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const addr = data.address || {};
      const streetAddress = [addr.house_number, addr.road].filter(Boolean).join(" ");
      const cityName = addr.city || addr.town || addr.village || addr.hamlet || addr.county || "";
      const zipCode = addr.postcode || "";
      const state = addr.state || "";
      
      const fullAddress = streetAddress || cityName || (data.display_name?.split(",")[0] ?? "");
      const displayStr = `${fullAddress}${cityName && cityName !== fullAddress ? `, ${cityName}` : ""}${state ? `, ${state}` : ""}${zipCode ? ` ${zipCode}` : ""}`.trim();
      
      const finalDisplay = displayStr ? displayStr : `Selected Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
      
      setQuery(finalDisplay);
      onAddressChange(finalDisplay);
      setSelectedLocation({ lat, lng, display: finalDisplay, street: streetAddress || "", city: cityName, zip: zipCode });
      
      onLocationSelect({
        address: finalDisplay,
        city: cityName,
        zip: zipCode,
        lat,
        lng,
      });
    } catch (err) {
      console.error("[reverseGeocode] Error:", err);
      // Show coordinates as fallback only if geocoding completely fails
      const fallbackAddress = `Selected Location`;
      setQuery(fallbackAddress);
      onAddressChange(fallbackAddress);
      setSelectedLocation({ lat, lng, display: fallbackAddress, street: "", city: "", zip: "" });
      
      onLocationSelect({
        address: fallbackAddress,
        city: "",
        zip: "",
        lat,
        lng,
      });
    }
  };

  // Search for addresses
  const searchAddress = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/geocode?action=search&q=${encodeURIComponent(searchQuery + ", Massachusetts, USA")}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data: NominatimResult[] = await res.json();

      // Filter to Massachusetts only
      const maResults = data.filter(
        (r) => r.address?.state === "Massachusetts"
      );
      setSuggestions(maResults.length > 0 ? maResults : data.slice(0, 5));
      setShowSuggestions(true);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
  const handleInputChange = (value: string) => {
    setQuery(value);
    onAddressChange(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchAddress(value);
    }, 400);
  };

  // Select a suggestion
  const selectSuggestion = (result: NominatimResult) => {
    const addr = result.address;
    const streetAddress = [addr?.house_number, addr?.road]
      .filter(Boolean)
      .join(" ");
    const cityName = addr?.city || addr?.town || addr?.village || "";
    const zipCode = addr?.postcode || "";
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    const fullAddress = streetAddress || result.display_name.split(",")[0];

    setQuery(fullAddress);
    onAddressChange(fullAddress);
    setShowSuggestions(false);
    setSelectedLocation({ lat, lng, display: fullAddress, street: streetAddress || "", city: cityName, zip: zipCode });

    // Move map to the selected location
    if (mapInstanceRef.current && markerRef.current) {
      if (isGoogleMapRef.current) {
        mapInstanceRef.current.panTo({ lat, lng });
        mapInstanceRef.current.setZoom(15);
        markerRef.current.setPosition({ lat, lng });
      } else {
        mapInstanceRef.current.flyTo([lat, lng], 15, { duration: 1.2 });
        markerRef.current.setLatLng([lat, lng]);
      }
    }

    onLocationSelect({
      address: fullAddress,
      city: cityName,
      zip: zipCode,
      lat,
      lng,
    });
  };

  // Locate Me
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        if (mapInstanceRef.current && markerRef.current) {
          if (isGoogleMapRef.current) {
            mapInstanceRef.current.panTo({ lat: latitude, lng: longitude });
            mapInstanceRef.current.setZoom(15);
            markerRef.current.setPosition({ lat: latitude, lng: longitude });
          } else {
            mapInstanceRef.current.flyTo([latitude, longitude], 15, { duration: 1.2 });
            markerRef.current.setLatLng([latitude, longitude]);
          }
        }
        await reverseGeocode(latitude, longitude);
        setLocating(false);
      },
      (error) => {
        console.error("Locate error:", error);
        alert("Unable to retrieve your location.");
        setLocating(false);
      }
    );
  };

  return (
    <div className="space-y-5">
      {/* Explicitly load Leaflet CSS in case Next.js dynamic import strips it */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      {/* Manual Mode UI */}
      {manualMode && (
        <div className="space-y-4 bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-black font-display text-navy">Manual Location Entry</h3>
            <button 
              onClick={() => setManualMode(false)}
              className="px-4 py-2 bg-navy text-white text-sm font-bold rounded-xl shadow-md hover:bg-navy-light transition-all flex items-center gap-2"
            >
              <MapIcon className="w-4 h-4" /> Use Map Instead
            </button>
          </div>
          
          <div>
            <label className="text-sm font-bold text-navy ml-1">Street Address</label>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onAddressChange(e.target.value);
                onLocationSelect({ address: e.target.value, city: "", zip: manualZip, lat: 0, lng: 0 });
              }}
              placeholder="123 Main St, Boston"
              className="w-full mt-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-navy ml-1">ZIP Code (For Distance Calculation)</label>
            <input
              type="text"
              value={manualZip}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 5);
                setManualZip(val);
                onLocationSelect({ address: query, city: "", zip: val, lat: 0, lng: 0 });
              }}
              placeholder="e.g. 02108"
              className="w-full mt-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral/20 outline-none"
            />
          </div>
        </div>
      )}

      {/* Map Mode UI */}
      <div className={manualMode ? "hidden" : "block"}>
      {/* Top Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleLocateMe}
          disabled={locating}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-navy text-white font-bold rounded-xl shadow-md hover:bg-navy-light transition-all disabled:opacity-50"
        >
          {locating ? <Loader2 className="w-5 h-5 animate-spin" /> : <LocateFixed className="w-5 h-5" />}
          Locate Me Automatically
        </button>
        <button
          onClick={() => setManualMode(true)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-coral text-white font-bold rounded-xl shadow-md hover:bg-coral-dark transition-all"
        >
          <Edit3 className="w-5 h-5" />
          Enter Address Manually
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-navy ml-1">
          Or Search Location
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Start typing an address in Massachusetts..."
            className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-coral/20 focus:border-coral/40 outline-none transition-all font-medium"
          />
          {isSearching && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-coral" />
          )}
          {query && !isSearching && (
            <button
              onClick={() => {
                setQuery("");
                onAddressChange("");
                setSuggestions([]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-navy/10 overflow-hidden"
            >
              {suggestions.map((result) => {
                const addr = result.address;
                const primary = [addr?.house_number, addr?.road]
                  .filter(Boolean)
                  .join(" ");
                const secondary = [
                  addr?.city || addr?.town || addr?.village,
                  addr?.state,
                  addr?.postcode,
                ]
                  .filter(Boolean)
                  .join(", ");

                return (
                  <button
                    key={result.place_id}
                    onClick={() => selectSuggestion(result)}
                    className="w-full text-left px-5 py-3.5 hover:bg-coral/5 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-b-0"
                  >
                    <MapPin className="w-4 h-4 text-coral mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-navy text-sm truncate">
                        {primary || result.display_name.split(",")[0]}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {secondary || result.display_name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="relative rounded-2xl border-2 border-gray-200 bg-gray-100 shadow-inner" style={{ overflow: 'hidden' }}>
        <div
          ref={mapContainerRef}
          className={`w-full h-full rounded-2xl md:rounded-3xl shadow-inner bg-[#f8f9fc] ${
            isDragging ? "cursor-grabbing" : "cursor-crosshair"
          }`}
          style={{ minHeight: "400px", position: "relative", zIndex: 1 }}
        >
          {/* Global styles for Leaflet overrides */}
          <style>{`
            .leaflet-container { background: #f8f9fc; font-family: 'Inter', sans-serif; }
            .leaflet-control-zoom { border: none !important; box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; border-radius: 12px !important; overflow: hidden; margin: 16px !important; }
            .leaflet-control-zoom a { background: rgba(255,255,255,0.9) !important; backdrop-filter: blur(12px); color: #071B3A !important; width: 36px !important; height: 36px !important; line-height: 36px !important; transition: all 0.2s !important; border-bottom: 1px solid rgba(0,0,0,0.05) !important; }
            .leaflet-control-zoom a:hover { background: #071B3A !important; color: #C9232D !important; }
            .leaflet-control-attribution { background: rgba(255,255,255,0.7) !important; backdrop-filter: blur(4px); border-radius: 4px 0 0 0; font-size: 9px !important; color: #9CA3AF !important; }
            .leaflet-control-attribution a { color: #071B3A !important; }
            @keyframes bounce-in { 0% { transform: scale(0.3) translateY(20px); opacity: 0; } 50% { transform: scale(1.1) translateY(-5px); } 100% { transform: scale(1) translateY(0); opacity: 1; } }
          `}</style>
        </div>
        {!mapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-coral mx-auto mb-3" />
              <p className="text-sm text-gray-500 font-medium">
                Loading map...
              </p>
            </div>
          </div>
        )}

        {/* Dragging indicator */}
        {isDragging && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-navy/90 backdrop-blur text-white text-xs font-bold rounded-full shadow-lg">
            Release to set location
          </div>
        )}

        {/* Drag hint badge */}
        {mapReady && !isDragging && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-white/90 backdrop-blur border border-gray-200 text-gray-600 text-xs font-semibold rounded-full shadow-lg flex items-center gap-2">
            <GripVertical className="w-3.5 h-3.5" />
            Drag the pin or click the map to adjust
          </div>
        )}
      </div>

      {/* Selected location display */}
      {selectedLocation && (
        <div className="flex items-start gap-3 p-4 bg-mint/5 border border-mint/20 rounded-2xl">
          <div className="w-9 h-9 rounded-full bg-mint/20 text-mint flex items-center justify-center shrink-0 mt-0.5">
            <Navigation className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-mint uppercase tracking-wider mb-1">📍 Event Location Confirmed</p>
            {selectedLocation.street && (
              <p className="text-sm font-bold text-navy">{selectedLocation.street}</p>
            )}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
              {selectedLocation.city && (
                <span className="text-sm text-gray-600 font-medium">
                  🏙 <span className="font-bold text-navy">{selectedLocation.city}</span>
                </span>
              )}
              {selectedLocation.zip && (
                <span className="text-sm text-gray-600 font-medium">
                  📮 ZIP: <span className="font-bold text-navy">{selectedLocation.zip}</span>
                </span>
              )}
              {!selectedLocation.street && !selectedLocation.city && (
                <span className="text-sm text-gray-500">{selectedLocation.display}</span>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

