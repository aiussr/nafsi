import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface EngagementTimelineProps {
  data: { date: string; comments: number; views: number }[];
}

export function EngagementTimeline({ data }: EngagementTimelineProps) {
  const formatted = data.map((d) => ({
    ...d,
    date: d.date.substring(5), // MM-DD
  }));

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-300 mb-4">
        Engagement Timeline (30 days)
      </h3>
      {data.length === 0 ? (
        <p className="text-xs text-gray-600 text-center py-8">No activity data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={formatted}>
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6b7280' }} />
            <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
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
            <Line
              type="monotone"
              dataKey="views"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="comments"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
