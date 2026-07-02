import { NavLink, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { destinationsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState } from '@/shared/components/Feedback';
import type { Destination } from '@/shared/types';

export function DestinationDetailsPage() {
  const [params] = useSearchParams();
  const id = params.get('id');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['destinations', id],
    queryFn: async () => {
      const res = await destinationsApi.getAll();
      const all = res.data.data as Destination[];
      return all.find((d) => d.id === Number(id));
    },
    enabled: Boolean(id),
  });

  if (isLoading) return <DashboardLayout activeNav={6}><LoadingSpinner /></DashboardLayout>;
  if (isError || !data) return <DashboardLayout activeNav={6}><ErrorState onRetry={() => refetch()} /></DashboardLayout>;

  return (
    <DashboardLayout activeNav={6}>
      <NavLink to="/destinations">
        <i className="fa-solid fa-angle-left arrow-left position-absolute" />
      </NavLink>
      <h1 className="special-head ml-25">Destination Details</h1>
      <div
        className="destination-hero mt-25"
        style={{ backgroundImage: `url(${data.Images[0]?.url})` }}
      >
        <div className="destination-hero-overlay">
          <h2>{data.name}</h2>
          <p><i className="fa-solid fa-star mr-5" />{data.rate}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
