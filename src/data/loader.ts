import type { ConflictEvent, Missile, EconomicIndicator, Blackout, MapMarker, MissilePath, ConflictDocument, Source } from '@/types';

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60_000; // 1 minute for static JSON

async function fetchJSON<T>(path: string): Promise<T> {
  const cached = cache.get(path);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  const data = await res.json();
  cache.set(path, { data, timestamp: Date.now() });
  return data as T;
}

async function fetchAPI<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`/.netlify/functions/${endpoint}`);
    if (!res.ok) return null;
    return await res.json() as T;
  } catch {
    return null;
  }
}

// Merge manual JSON + live API data, dedup by ID, tag source
function mergeData<T extends { id: string }>(
  manual: T[],
  ...live: (T[] | null)[]
): T[] {
  const byId = new Map<string, T>();

  // Manual entries first (priority)
  for (const item of manual) {
    byId.set(item.id, { ...item, _source: 'manual' } as T);
  }

  // Live entries only if not already in manual
  for (const dataset of live) {
    if (!dataset) continue;
    for (const item of dataset) {
      if (!byId.has(item.id)) {
        byId.set(item.id, item);
      }
    }
  }

  return Array.from(byId.values());
}

export async function loadEvents(): Promise<ConflictEvent[]> {
  const manual = await fetchJSON<ConflictEvent[]>('/data/events.json');
  const rssEvents = await fetchAPI<ConflictEvent[]>('rss-feed');
  const gdeltEvents = await fetchAPI<ConflictEvent[]>('gdelt-events');
  const merged = mergeData(manual, rssEvents, gdeltEvents);
  return merged.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function loadMissiles(): Promise<Missile[]> {
  return fetchJSON<Missile[]>('/data/missiles.json');
}

export async function loadEconomic(): Promise<EconomicIndicator[]> {
  return fetchJSON<EconomicIndicator[]>('/data/economic.json');
}

export async function loadBlackouts(): Promise<Blackout[]> {
  const manual = await fetchJSON<Blackout[]>('/data/blackouts.json');
  return manual.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
}

export async function loadMapData(): Promise<{ markers: MapMarker[]; missilePaths: MissilePath[] }> {
  const data = await fetchJSON<{ markers: MapMarker[]; missilePaths: MissilePath[] }>('/data/map-markers.json');
  const gdeltGeo = await fetchAPI<MapMarker[]>('gdelt-geo');
  if (gdeltGeo) {
    data.markers = mergeData(data.markers, gdeltGeo);
  }
  return data;
}

export async function loadDocuments(): Promise<ConflictDocument[]> {
  const docs = await fetchJSON<ConflictDocument[]>('/data/documents.json');
  return docs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function loadSources(): Promise<Source[]> {
  return fetchJSON<Source[]>('/data/sources.json');
}

export async function loadConfig(): Promise<Record<string, unknown>> {
  return fetchJSON<Record<string, unknown>>('/data/config.json');
}
