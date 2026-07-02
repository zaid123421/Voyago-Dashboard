import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { requestsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/shared/components/Feedback';
import { PageHeader, useConfirmDialog } from '@/shared/components/PageUI';
import { formatDate, formatRowIndex } from '@/shared/utils';
import type { DeleteProfileRequest } from '@/shared/types';

export function RequestsListPage() {
  const queryClient = useQueryClient();
  const { confirm, dialog } = useConfirmDialog();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['delete-requests'],
    queryFn: async () => {
      const res = await requestsApi.getDeleteProfileRequests();
      return res.data.data as DeleteProfileRequest[];
    },
  });

  const acceptMutation = useMutation({
    mutationFn: (id: number) => requestsApi.acceptDelete(id),
    onSuccess: () => {
      toast.success('Account deleted and wallet emptied');
      queryClient.invalidateQueries({ queryKey: ['delete-requests'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return (
    <DashboardLayout activeNav={9} className="nav-item-content">
      <PageHeader title="Delete Account Requests" />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.length === 0 && <EmptyState message="No requests" />}
      {!isLoading && !isError && data && data.length > 0 && (
        <div className="table-container">
          <table className="special-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Request ID</th>
                <th>Username</th>
                <th>Balance</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((req, index) => (
                <tr key={req.id}>
                  <td>{formatRowIndex(index)}</td>
                  <td>#{req.id}</td>
                  <td>{req.User.username}</td>
                  <td>{req.User.wallet.balance}</td>
                  <td>{formatDate(req.createdAt)}</td>
                  <td>
                    <span
                      role="button"
                      tabIndex={0}
                      className="delete-action"
                      onClick={async () => {
                        const ok = await confirm(
                          'Accept Delete Request',
                          `Empty wallet and delete ${req.User.username}?`,
                          'Accept',
                        );
                        if (ok) acceptMutation.mutate(req.id);
                      }}
                      onKeyDown={() => {}}
                    >
                      Accept
                    </span>
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
