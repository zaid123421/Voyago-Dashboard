import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { usersApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/shared/components/Feedback';
import { FloatingAddLink, PageHeader, useConfirmDialog } from '@/shared/components/PageUI';
import { formatRowIndex } from '@/shared/utils';

export function UsersListPage() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const { confirm, dialog } = useConfirmDialog();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => (await usersApi.getAll()).data.users,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => usersApi.delete(id),
    onSuccess: () => {
      toast.success('User deleted');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: () => toast.error('Failed to delete user'),
  });

  const filtered = useMemo(
    () => data?.filter((u) => u.username.toLowerCase().startsWith(search.toLowerCase())) ?? [],
    [data, search],
  );

  return (
    <DashboardLayout activeNav={3} className="nav-item-content">
      <PageHeader title="Users" search={search} onSearchChange={setSearch} />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && filtered.length === 0 && (
        <EmptyState message="No users found" />
      )}
      {!isLoading && !isError && filtered.length > 0 && (
        <div className="table-container">
          <table className="special-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Balance</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, index) => (
                <tr key={user.id}>
                  <td>{formatRowIndex(index)}</td>
                  <td>{user.username}</td>
                  <td>{user.balance}</td>
                  <td>
                    <Link to={`/users/${user.id}`}>
                      <i className="fa-solid fa-eye table-icon" />
                    </Link>
                  </td>
                  <td>
                    <i
                      role="button"
                      tabIndex={0}
                      onClick={async () => {
                        const ok = await confirm('Delete User', `Delete ${user.username}?`);
                        if (ok) deleteMutation.mutate(user.id);
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
      <FloatingAddLink to="/adduser" />
      {dialog}
    </DashboardLayout>
  );
}
