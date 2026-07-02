import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner, ErrorState } from '@/shared/components/Feedback';
import { useConfirmDialog } from '@/shared/components/PageUI';
import { formatDate } from '@/shared/utils';
import type { Admin } from '@/shared/types';

export function AdminDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { confirm, dialog } = useConfirmDialog();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admins', id],
    queryFn: async () => {
      const res = await adminsApi.getById(id!);
      return res.data.data.admin as Admin;
    },
    enabled: Boolean(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => adminsApi.delete(Number(id)),
    onSuccess: () => {
      toast.success('Admin deleted');
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      navigate('/admins');
    },
  });

  if (isLoading) return <DashboardLayout activeNav={2}><LoadingSpinner /></DashboardLayout>;
  if (isError || !data) return <DashboardLayout activeNav={2}><ErrorState onRetry={() => refetch()} /></DashboardLayout>;

  return (
    <DashboardLayout activeNav={2}>
      <NavLink to="/admins">
        <i className="fa-solid fa-angle-left arrow-left position-absolute" />
      </NavLink>
      <h1 className="special-head ml-25">Admin Details</h1>
      <div className="user-details-box">
        <div className="user-details w-50">
          <div className="d-flex align-c justify-sb mb-30">
            <h2 className="fs-18">Username:</h2>
            <p className="fs-14">{data.username}</p>
          </div>
          <div className="d-flex align-c justify-sb mb-30">
            <h2 className="fs-18">Email:</h2>
            <p className="fs-14">{data.email}</p>
          </div>
          <div className="d-flex align-c justify-sb mb-30">
            <h2 className="fs-18">Role:</h2>
            <p className="fs-14">{data.role}</p>
          </div>
          <div className="d-flex align-c justify-sb">
            <h2 className="fs-18">Created at:</h2>
            <p className="fs-14">{formatDate(data.createdAt)}</p>
          </div>
        </div>
        <div className="w-50 icons-box">
          <i
            role="button"
            tabIndex={0}
            onClick={async () => {
              const ok = await confirm('Delete Admin', `Delete ${data.username}?`);
              if (ok) deleteMutation.mutate();
            }}
            onKeyDown={() => {}}
            className="fa-regular fa-trash-can table-icon ml-15"
          />
        </div>
      </div>
      {dialog}
    </DashboardLayout>
  );
}
