import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { usersApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState } from '@/shared/components/Feedback';
import { useConfirmDialog } from '@/shared/components/PageUI';
import { formatDate, formatRowIndex } from '@/shared/utils';
import type { Reservation } from '@/shared/types';

export function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { confirm, dialog } = useConfirmDialog();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const res = await usersApi.getById(id!);
      return res.data.data as {
        user: { username: string; email: string; createdAt: string };
        reservations: Reservation[];
      };
    },
    enabled: Boolean(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => usersApi.delete(Number(id)),
    onSuccess: () => {
      toast.success('User deleted');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('/users');
    },
  });

  if (isLoading) {
    return <DashboardLayout activeNav={3}><LoadingSpinner /></DashboardLayout>;
  }

  if (isError || !data) {
    return <DashboardLayout activeNav={3}><ErrorState onRetry={() => refetch()} /></DashboardLayout>;
  }

  const { user, reservations } = data;

  return (
    <DashboardLayout activeNav={3}>
      <NavLink to="/users">
        <i className="fa-solid fa-angle-left arrow-left position-absolute" />
      </NavLink>
      <h1 className="special-head ml-25">User Details</h1>
      <div className="user-details-box">
        <div className="user-details w-50">
          <div className="d-flex align-c justify-sb mb-30">
            <h2 className="fs-18">Name:</h2>
            <p className="fs-14">{user.username}</p>
          </div>
          <div className="d-flex align-c justify-sb mb-30">
            <h2 className="fs-18">Email:</h2>
            <p className="fs-14">{user.email}</p>
          </div>
          <div className="d-flex align-c justify-sb">
            <h2 className="fs-18">Created at:</h2>
            <p className="fs-14">{formatDate(user.createdAt)}</p>
          </div>
        </div>
        <div className="w-50 icons-box">
          <i
            role="button"
            tabIndex={0}
            onClick={async () => {
              const ok = await confirm('Delete User', `Delete ${user.username}?`);
              if (ok) deleteMutation.mutate();
            }}
            onKeyDown={() => {}}
            className="fa-regular fa-trash-can table-icon ml-15"
          />
        </div>
        <h2 className="mt-30 mb-20">Reserved Trips</h2>
        <div className="w-100 overflow-s ez">
          <div className="pr-25">
            <table className="reserved-trips-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Trip Name</th>
                  <th>Reservation Number</th>
                </tr>
              </thead>
              <tbody>
                {reservations.length === 0 ? (
                  <tr><td colSpan={3}>No reservations</td></tr>
                ) : (
                  reservations.map((r, index) => (
                    <tr key={r.id}>
                      <td>{formatRowIndex(index)}</td>
                      <td>{r.Trip.name}</td>
                      <td>#{r.id}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {dialog}
    </DashboardLayout>
  );
}
