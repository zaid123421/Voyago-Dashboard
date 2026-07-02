import { lazy, Suspense } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { VisitorStat } from '@/shared/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface VisitorsChartProps {
  data: VisitorStat[];
}

function VisitorsChart({ data }: VisitorsChartProps) {
  const chartData = {
    labels: data.map((d) => d.Month),
    datasets: [
      {
        label: 'Visitors Analytics',
        data: data.map((d) => d.Visitors),
        backgroundColor: 'rgba(140, 65, 239, 1)',
        barThickness: 20,
        borderRadius: 10,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 400 },
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(255,255,255,0.06)' } },
        },
      }}
    />
  );
}

export const LazyVisitorsChart = lazy(() =>
  Promise.resolve({ default: VisitorsChart }),
);

export function ChartLoader() {
  return (
    <div className="chart-skeleton">
      <div className="loading-spinner" />
    </div>
  );
}

export function DashboardChart({ data }: VisitorsChartProps) {
  return (
    <Suspense fallback={<ChartLoader />}>
      <LazyVisitorsChart data={data} />
    </Suspense>
  );
}
