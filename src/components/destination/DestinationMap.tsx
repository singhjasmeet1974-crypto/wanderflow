import React from 'react';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';
import { Attraction } from '../../types';

interface DestinationMapProps {
  destinationName: string;
  latitude: number;
  longitude: number;
  attractions?: Attraction[];
}

export const DestinationMap: React.FC<DestinationMapProps> = ({
  destinationName,
  latitude,
  longitude,
  attractions = [],
}) => {
  // OpenStreetMap embed URL with bounding box around the coordinates
  const delta = 0.08;
  const bbox = `${longitude - delta},${latitude - delta},${longitude + delta},${latitude + delta}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const osmDirectUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=13/${latitude}/${longitude}`;

  return (
    <div className="bg-white rounded-2xl border border-[#E6E2D8] overflow-hidden shadow-xs">
      {/* Map Header */}
      <div className="p-4 bg-stone-50 border-b border-[#E6E2D8] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#16382B]/10 text-[#16382B]">
            <Compass className="w-4 h-4 text-[#16382B]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900 font-editorial">
              Geographic Map &amp; Landmarks
            </h4>
            <p className="text-[11px] text-stone-500">
              OpenStreetMap Open Geospatial Data ({latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-[#16382B] hover:border-stone-400 transition"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
          <a
            href={osmDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#16382B] text-white text-xs font-semibold hover:bg-[#235441] transition"
          >
            <Navigation className="w-3 h-3 text-[#E5A43B]" />
            <span>Open in OSM</span>
          </a>
        </div>
      </div>

      {/* Embedded Map Frame */}
      <div className="relative w-full h-72 sm:h-80 bg-stone-100">
        <iframe
          title={`Map of ${destinationName}`}
          src={osmEmbedUrl}
          className="w-full h-full border-0"
          loading="lazy"
        />

        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-stone-500 border border-stone-200">
          © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap</a> contributors
        </div>
      </div>

      {/* Attractions Landmark Quick Chips */}
      {attractions.length > 0 && (
        <div className="p-4 bg-[#FAF9F6] border-t border-stone-200">
          <p className="text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
            Key Landmarks Located in this Zone:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {attractions.slice(0, 4).map((attraction, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2 rounded-xl bg-white border border-stone-200 text-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E0704D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">{attraction.name}</span>
                  <span className="text-[11px] text-stone-500">{attraction.type} • Est. {attraction.estimatedTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
