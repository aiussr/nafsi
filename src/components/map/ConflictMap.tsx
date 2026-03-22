import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '@/hooks/useLanguage';
import type { MapMarker, MissilePath, Blackout } from '@/types';

// Fix default marker icons in webpack/vite
import 'leaflet/dist/leaflet.css';

const markerColors: Record<string, string> = {
  target: '#dc2626',
  launch_site: '#f97316',
  interception: '#22c55e',
  blackout_zone: '#8b5cf6',
  military_base: '#3b82f6',
};

function createIcon(color: string) {
  return L.divIcon({
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 6px ${color}80;"></div>`,
    className: '',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

interface ConflictMapProps {
  markers: MapMarker[];
  missilePaths: MissilePath[];
  blackouts?: Blackout[];
  className?: string;
  center?: [number, number];
  zoom?: number;
}

export function ConflictMap({
  markers,
  missilePaths,
  blackouts = [],
  className = 'h-[600px]',
  center = [32, 44],
  zoom = 5,
}: ConflictMapProps) {
  const { t } = useLanguage();

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={`${className} rounded-xl overflow-hidden`}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* Markers */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.position.lat, marker.position.lng]}
          icon={createIcon(markerColors[marker.type] || '#888')}
        >
          <Popup className="dark-popup">
            <div className="text-sm">
              <p className="font-semibold text-gray-900">{t(marker.label)}</p>
              <p className="text-gray-600 text-xs mt-1">{t(marker.details)}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                {marker.type.replace('_', ' ')}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Missile Paths */}
      {missilePaths.map((path) => (
        <Polyline
          key={path.id}
          positions={[
            [path.from.lat, path.from.lng],
            [path.to.lat, path.to.lng],
          ]}
          pathOptions={{
            color: path.intercepted ? '#22c55e' : '#dc2626',
            weight: 2,
            dashArray: '8 4',
            opacity: 0.7,
          }}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">
                {t(path.from.label)} → {t(path.to.label)}
              </p>
              {path.intercepted && (
                <span className="text-green-600 text-xs font-medium">Intercepted</span>
              )}
            </div>
          </Popup>
        </Polyline>
      ))}

      {/* Blackout zones */}
      {blackouts
        .filter((b) => b.status === 'ongoing')
        .map((b) => (
          <Circle
            key={b.id}
            center={[b.location.lat, b.location.lng]}
            radius={(b.affectedArea_km2 || 100) * 500}
            pathOptions={{
              color: '#8b5cf6',
              fillColor: '#8b5cf6',
              fillOpacity: 0.15,
              weight: 1,
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{b.location.name}</p>
                <p className="text-gray-600 text-xs">{b.type} blackout</p>
              </div>
            </Popup>
          </Circle>
        ))}
    </MapContainer>
  );
}
