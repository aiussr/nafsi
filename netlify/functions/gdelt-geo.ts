import type { Handler } from '@netlify/functions';

const GDELT_GEO_API = 'https://api.gdeltproject.org/api/v2/geo/geo';

const handler: Handler = async () => {
  try {
    const params = new URLSearchParams({
      query: '(iran OR israel) (missile OR strike OR military)',
      format: 'GeoJSON',
      timespan: '7d',
      maxpoints: '50',
    });

    const res = await fetch(`${GDELT_GEO_API}?${params}`);
    if (!res.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'GDELT GEO API error' }) };
    }

    const geojson = await res.json();
    const features = geojson.features || [];

    const markers = features.map((f: { properties: { name?: string; url?: string; urlpubtimeseq?: string }; geometry: { coordinates: number[] } }, i: number) => ({
      id: `gdelt-geo-${i}`,
      type: 'target' as const,
      position: {
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
      },
      label: { en: f.properties.name || 'GDELT Event', he: '', ar: '' },
      details: { en: f.properties.url || '', he: '', ar: '' },
      icon: 'target' as const,
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
      body: JSON.stringify(markers),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch GDELT geo data' }),
    };
  }
};

export { handler };
