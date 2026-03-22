import type { Handler } from '@netlify/functions';

const GDELT_API = 'https://api.gdeltproject.org/api/v2/doc/doc';

const handler: Handler = async () => {
  try {
    const params = new URLSearchParams({
      query: '(iran OR israel) (missile OR strike OR military OR attack)',
      mode: 'ArtList',
      maxrecords: '50',
      format: 'json',
      sort: 'DateDesc',
      timespan: '7d',
    });

    const res = await fetch(`${GDELT_API}?${params}`);
    if (!res.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'GDELT API error' }) };
    }

    const data = await res.json();
    const articles = data.articles || [];

    const events = articles.map((article: { url: string; title: string; seendate: string; domain: string; sourcecountry?: string; language?: string }, i: number) => ({
      id: `gdelt-${Buffer.from(article.url).toString('base64').slice(0, 20)}`,
      timestamp: article.seendate
        ? `${article.seendate.slice(0, 4)}-${article.seendate.slice(4, 6)}-${article.seendate.slice(6, 8)}T${article.seendate.slice(8, 10)}:${article.seendate.slice(10, 12)}:00Z`
        : new Date().toISOString(),
      title: { en: article.title, he: '', ar: '' },
      description: { en: `Source: ${article.domain}`, he: '', ar: '' },
      type: 'military',
      location: { name: 'Middle East', lat: 32, lng: 44, country: '' },
      severity: 'medium',
      sources: [],
      media: [],
      relatedEvents: [],
      verified: false,
      _source: 'gdelt',
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
      body: JSON.stringify(events),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch GDELT events' }),
    };
  }
};

export { handler };
