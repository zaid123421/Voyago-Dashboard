import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { destinationsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/shared/components/Feedback';
import { FloatingAddLink, PageHeader } from '@/shared/components/PageUI';
import type { Destination } from '@/shared/types';

export function DestinationsListPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const res = await destinationsApi.getAll();
      return res.data.data as Destination[];
    },
  });

  return (
    <DashboardLayout activeNav={6}>
      <PageHeader title="Destinations" />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.length === 0 && <EmptyState message="No destinations" />}
      <div className="trips-container attractions-container">
        {data?.map((destination) => (
          <NavLink key={destination.id} to={`/destinationdetails?id=${destination.id}`}>
            <div style={{ backgroundImage: `url(${destination.Images[0]?.url})` }}>
              <div className="head">
                <div className="fs-14">
                  <i className="fa-solid fa-star mr-5" />
                  <span className="fw-600">{destination.rate}</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="fw-600 text-c">{destination.name}</h3>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      <FloatingAddLink to="/adddestination" />
    </DashboardLayout>
  );
}
