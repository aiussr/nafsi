import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PageViewChartProps {
  data: { page: string; count: number }[];
}

export function PageViewChart({ data }: PageViewChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    page: d.page === '/' ? 'Home' : d.page.replace('/', '').charAt(0).toUpperCase() + d.page.slice(2),
  }));

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-300 mb-4">Page Views</h3>
      {data.length === 0 ? (
        <p className="text-xs text-gray-600 text-center py-8">No page view data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={formatted}>
            <XAxis dataKey="page" tick={{ fontSize: 11, fill: '#6b7280' }} />
            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a2e',
                border: '1px solid #2a2a3e',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
