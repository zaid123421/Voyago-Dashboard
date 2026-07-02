import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { reservationsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/shared/components/Feedback';
import { PageHeader, useConfirmDialog } from '@/shared/components/PageUI';
import { formatDate, formatRowIndex } from '@/shared/utils';
import type { Reservation } from '@/shared/types';

export function ReservationsListPage() {
  const queryClient = useQueryClient();
  const { confirm, dialog } = useConfirmDialog();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['reservations'],
    queryFn: async () => {
      const res = await reservationsApi.getAll();
      return res.data.data as Reservation[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => reservationsApi.delete(id),
    onSuccess: () => {
      toast.success('Reservation deleted');
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return (
    <DashboardLayout activeNav={7} className="nav-item-content">
      <PageHeader title="Reservations" />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.length === 0 && <EmptyState message="No reservations" />}
      {!isLoading && !isError && data && data.length > 0 && (
        <div className="table-container">
          <table className="special-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Reservation ID</th>
                <th>Username</th>
                <th>Trip Name</th>
                <th>Reservation Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, index) => (
                <tr key={r.id}>
                  <td>{formatRowIndex(index)}</td>
                  <td>#{r.id}</td>
                  <td>{r.User.username}</td>
                  <td>{r.Trip.name}</td>
                  <td>{formatDate(r.createdAt)}</td>
                  <td>
                    <i
                      role="button"
                      tabIndex={0}
                      onClick={async () => {
                        const ok = await confirm('Delete Reservation', `Delete reservation #${r.id}?`);
                        if (ok) deleteMutation.mutate(r.id);
                      }}
                      onKeyDown={() => {}}
                      className="fa-regular fa-trash-can table-icon"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {dialog}
    </DashboardLayout>
  );
}
