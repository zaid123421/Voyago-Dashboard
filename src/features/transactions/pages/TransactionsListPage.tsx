import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { transactionsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/shared/components/Feedback';
import { PageHeader } from '@/shared/components/PageUI';
import { formatDate, formatRowIndex } from '@/shared/utils';
import type { Transaction } from '@/shared/types';

export function TransactionsListPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await transactionsApi.getAll();
      return res.data.data as Transaction[];
    },
  });

  return (
    <DashboardLayout activeNav={8} className="nav-item-content">
      <div className="d-flex align-c">
        <PageHeader title="Transactions" />
        <NavLink className="deposit" to="/transactionrequests">Transactions Requests</NavLink>
      </div>
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.length === 0 && <EmptyState message="No transactions" />}
      {!isLoading && !isError && data && data.length > 0 && (
        <div className="table-container">
          <table className="special-table transaction-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Accountant</th>
                <th>Username</th>
                <th>Transaction ID</th>
                <th>Transaction Type</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((t, index) => (
                <tr key={t.id}>
                  <td>{formatRowIndex(index)}</td>
                  <td>{t.Admin?.username ?? '-'}</td>
                  <td>{t.wallet.User.username}</td>
                  <td>#{t.id}</td>
                  <td><button type="button" className="credit-bt">{t.type}</button></td>
                  <td>
                    <button
                      type="button"
                      className={
                        t.status === 'Success' ? 'success'
                          : t.status === 'pending' ? 'pending'
                          : t.status === 'Failed' ? 'failed' : ''
                      }
                    >
                      {t.status}
                    </button>
                  </td>
                  <td>{formatDate(t.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
