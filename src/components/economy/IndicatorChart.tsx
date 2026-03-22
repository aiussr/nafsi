import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { useLanguage } from '@/hooks/useLanguage';
import type { EconomicIndicator } from '@/types';

interface IndicatorChartProps {
  indicator: EconomicIndicator;
}

export function IndicatorChart({ indicator }: IndicatorChartProps) {
  const { t } = useLanguage();

  const data = indicator.dataPoints.map((dp) => ({
    date: dp.date,
    value: dp.value,
    note: dp.note,
  }));

  const annotatedPoints = data.filter((d) => d.note);

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-200">{t(indicator.indicator)}</h3>
        <span className="text-xs text-gray-500">{indicator.unit}</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#242432" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#6b7280', fontSize: 10 }}
            tickFormatter={(v) => v.slice(5)}
          />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a24',
              border: '1px solid #2e2e40',
              borderRadius: '8px',
              color: '#e5e7eb',
              fontSize: '12px',
            }}
            formatter={(value: number) => [value.toLocaleString(), indicator.unit]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#3b82f6' }}
          />
          {annotatedPoints.map((pt) => (
            <ReferenceDot
              key={pt.date}
              x={pt.date}
              y={pt.value}
              r={4}
              fill="#f59e0b"
              stroke="#f59e0b"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      {annotatedPoints.length > 0 && (
        <div className="mt-2 space-y-1">
          {annotatedPoints.map((pt) => (
            <p key={pt.date} className="text-xs text-warning/80">
              <span className="text-gray-500">{pt.date}:</span> {pt.note}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
