import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { transactionsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/shared/components/Feedback';
import { ImagePreviewModal } from '@/shared/components/Modal';
import { formatDate, formatRowIndex } from '@/shared/utils';
import type { ChargeRequest } from '@/shared/types';

export function TransactionRequestsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['charge-requests'],
    queryFn: async () => {
      const res = await transactionsApi.getChargeRequests();
      return res.data.data as ChargeRequest[];
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id: number) => transactionsApi.approveCharge(id),
    onSuccess: () => {
      toast.success('Charge approved');
      queryClient.invalidateQueries({ queryKey: ['charge-requests'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) => transactionsApi.rejectCharge(id),
    onSuccess: () => {
      toast.success('Charge rejected');
      queryClient.invalidateQueries({ queryKey: ['charge-requests'] });
    },
  });

  return (
    <DashboardLayout activeNav={8} className="nav-item-content">
      <div className="d-flex align-c">
        <NavLink to="/transactions">
          <i className="fa-solid fa-angle-left arrow-left position-absolute transaction-arrow" />
        </NavLink>
        <h1 className="special-head-arrow special-head">Transactions Requests</h1>
      </div>
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.length === 0 && <EmptyState message="No pending requests" />}
      {!isLoading && !isError && data && data.length > 0 && (
        <div className="table-container">
          <table className="special-table transaction-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Transactions Amount</th>
                <th>Receipt</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((req, index) => (
                <tr key={req.id}>
                  <td>{formatRowIndex(index)}</td>
                  <td>{req.User.username}</td>
                  <td>{req.amount}</td>
                  <td>
                    <i
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedImage(req.bank_ticket)}
                      onKeyDown={() => {}}
                      className="fa-solid fa-eye table-icon"
                    />
                  </td>
                  <td>{formatDate(req.createdAt)}</td>
                  <td className="only-this">
                    <div className="d-flex justify-sb">
                      <span role="button" tabIndex={0} onClick={() => approveMutation.mutate(req.id)} onKeyDown={() => {}}>Accept</span>
                      <span role="button" tabIndex={0} onClick={() => rejectMutation.mutate(req.id)} onKeyDown={() => {}}>Refuse</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ImagePreviewModal
        open={Boolean(selectedImage)}
        src={selectedImage}
        alt="Bank receipt"
        onClose={() => setSelectedImage(null)}
      />
    </DashboardLayout>
  );
}
