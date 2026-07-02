import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { tripsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/shared/components/Feedback';
import { FloatingAddLink, PageHeader, useConfirmDialog } from '@/shared/components/PageUI';
import { formatTripDate } from '@/shared/utils';
import type { TripCard } from '@/shared/types';

export function TripsListPage() {
  const queryClient = useQueryClient();
  const { confirm, dialog } = useConfirmDialog();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const res = await tripsApi.getCards();
      return res.data.data.cards as TripCard[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => tripsApi.delete(id),
    onSuccess: () => {
      toast.success('Trip deleted');
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return (
    <DashboardLayout activeNav={4}>
      <PageHeader title="Trips" />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.length === 0 && <EmptyState message="No trips" />}
      <div className="trips-container">
        {data?.map((trip) => {
          const imageUrl = trip.images[0]?.url ?? '';
          const reserved = trip.rate.capacity - trip.rate.available_capacity;
          return (
            <div key={trip.rate.id} style={{ backgroundImage: `url(${imageUrl})` }}>
              <div className="head">
                <i
                  role="button"
                  tabIndex={0}
                  onClick={async () => {
                    const ok = await confirm('Delete Trip', `Delete ${trip.rate.name}?`);
                    if (ok) deleteMutation.mutate(trip.rate.id);
                  }}
                  onKeyDown={() => {}}
                  className="fa-regular fa-trash-can trip-trash fs-14"
                />
                <div className="fs-14">
                  <i className="fa-solid fa-star mr-5" />
                  <span className="fw-600">{trip.rate.rate}</span>
                </div>
              </div>
              <div className="card-info">
                <h3 className="fw-600">{trip.rate.name}</h3>
                <div className="mb-5">
                  <span className="how">{reserved} / {trip.rate.capacity} reserved</span>
                  <span className="state">{trip.rate.avilable === 1 ? 'Available' : 'Not Available'}</span>
                </div>
                <div className="mb-5">
                  <i className="fa-solid fa-location-dot mr-10" />
                  <span className="fs-14">{trip.Destenation}</span>
                </div>
                <div className="mb-5">
                  <i className="fa-regular fa-calendar-days mr-10" />
                  <span className="fs-14">{formatTripDate(trip.rate.start_date, trip.rate.end_date)}</span>
                </div>
                <div>
                  <i className="fa-solid fa-clock mr-10" />
                  <span className="fs-14">{trip.duration} day(s)</span>
                </div>
                <span className="fs-14 price">From ${trip.rate.trip_price}</span>
              </div>
            </div>
          );
        })}
      </div>
      <FloatingAddLink to="/addtrip" />
      {dialog}
    </DashboardLayout>
  );
}
