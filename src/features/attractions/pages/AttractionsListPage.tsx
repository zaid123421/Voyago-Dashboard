import { useQuery } from '@tanstack/react-query';
import { attractionsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/shared/components/Feedback';
import { FloatingAddLink, PageHeader } from '@/shared/components/PageUI';
import type { Attraction } from '@/shared/types';

export function AttractionsListPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['attractions'],
    queryFn: async () => {
      const res = await attractionsApi.getAll();
      return res.data.data as Attraction[];
    },
  });

  return (
    <DashboardLayout activeNav={5}>
      <PageHeader title="Attractions" />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.length === 0 && <EmptyState message="No attractions" />}
      <div className="trips-container attractions-container">
        {data?.map((attraction) => (
          <div key={attraction.id} style={{ backgroundImage: `url(${attraction.Images[0]?.url})` }}>
            <div className="head">
              <div className="fs-14">
                <i className="fa-solid fa-star mr-5" />
                <span className="fw-600">{attraction.rate}</span>
              </div>
            </div>
            <div className="card-info">
              <h3 className="fw-600 text-c">{attraction.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <FloatingAddLink to="/addattraction" />
    </DashboardLayout>
  );
}
