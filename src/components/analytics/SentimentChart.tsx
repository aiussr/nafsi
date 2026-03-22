import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SentimentChartProps {
  data: { label: string; count: number }[];
}

const COLORS: Record<string, string> = {
  positive: '#22c55e',
  negative: '#dc2626',
  neutral: '#6b7280',
};

export function SentimentChart({ data }: SentimentChartProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-300 mb-4">Comment Sentiment</h3>
      {total === 0 ? (
        <p className="text-xs text-gray-600 text-center py-8">No comment data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ label, percent }) =>
                `${label} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((entry) => (
                <Cell key={entry.label} fill={COLORS[entry.label] || '#6b7280'} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a2e',
                border: '1px solid #2a2a3e',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend
              formatter={(value: string) => (
                <span className="text-xs text-gray-400">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
