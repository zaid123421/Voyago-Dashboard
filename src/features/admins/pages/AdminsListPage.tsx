import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/shared/components/Feedback';
import { FloatingAddLink, PageHeader, useConfirmDialog } from '@/shared/components/PageUI';
import { formatRowIndex } from '@/shared/utils';

export function AdminsListPage() {
  const queryClient = useQueryClient();
  const { confirm, dialog } = useConfirmDialog();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admins'],
    queryFn: async () => (await adminsApi.getAll()).data.admins,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminsApi.delete(id),
    onSuccess: () => {
      toast.success('Admin deleted');
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
    onError: () => toast.error('Failed to delete admin'),
  });

  return (
    <DashboardLayout activeNav={2}>
      <PageHeader title="Admins" />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.length === 0 && <EmptyState message="No admins" />}
      {!isLoading && !isError && data && data.length > 0 && (
        <div className="table-container">
          <table className="special-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((admin, index) => (
                <tr key={admin.id}>
                  <td>{formatRowIndex(index)}</td>
                  <td>{admin.username}</td>
                  <td>{admin.role}</td>
                  <td>
                    <Link to={`/admins/${admin.id}`}>
                      <i className="fa-solid fa-eye table-icon" />
                    </Link>
                  </td>
                  <td>
                    <i
                      role="button"
                      tabIndex={0}
                      onClick={async () => {
                        const ok = await confirm('Delete Admin', `Delete ${admin.username}?`);
                        if (ok) deleteMutation.mutate(admin.id);
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
      <FloatingAddLink to="/addadmin" />
      {dialog}
    </DashboardLayout>
  );
}
