import type { Handler } from '@netlify/functions';
import Parser from 'rss-parser';

const parser = new Parser();

const CONFLICT_KEYWORDS = [
  'iran', 'israel', 'missile', 'strike', 'attack', 'military',
  'tehran', 'tel aviv', 'idf', 'irgc', 'nuclear', 'drone',
  'interception', 'iron dome', 'ballistic', 'hezbollah',
];

const RSS_FEEDS = [
  { name: 'Reuters', url: 'https://www.reuters.com/arc/outboundfeeds/rss/category/middle-east/' },
  { name: 'BBC', url: 'https://feeds.bbci.co.uk/news/world/middle_east/rss.xml' },
  { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
];

function isConflictRelated(text: string): boolean {
  const lower = text.toLowerCase();
  return CONFLICT_KEYWORDS.some((kw) => lower.includes(kw));
}

const handler: Handler = async () => {
  try {
    const allItems: Array<{
      id: string;
      timestamp: string;
      title: { en: string; he: string; ar: string };
      description: { en: string; he: string; ar: string };
      type: string;
      location: { name: string; lat: number; lng: number; country: string };
      severity: string;
      sources: string[];
      media: never[];
      relatedEvents: never[];
      verified: boolean;
      _source: string;
    }> = [];

    for (const feedConfig of RSS_FEEDS) {
      try {
        const feed = await parser.parseURL(feedConfig.url);
        for (const item of feed.items || []) {
          const title = item.title || '';
          const desc = item.contentSnippet || item.content || '';

          if (!isConflictRelated(title + ' ' + desc)) continue;

          allItems.push({
            id: `rss-${Buffer.from(item.link || item.guid || title).toString('base64').slice(0, 20)}`,
            timestamp: item.isoDate || new Date().toISOString(),
            title: { en: title, he: title, ar: title },
            description: { en: desc.slice(0, 500), he: '', ar: '' },
            type: 'military',
            location: { name: 'Middle East', lat: 32, lng: 44, country: '' },
            severity: 'medium',
            sources: [],
            media: [],
            relatedEvents: [],
            verified: false,
            _source: 'rss',
          });
        }
      } catch {
        // Skip failed feeds
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
      body: JSON.stringify(allItems),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch RSS feeds' }),
    };
  }
};

export { handler };
