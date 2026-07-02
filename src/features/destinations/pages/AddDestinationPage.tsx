import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { destinationsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';

export function AddDestinationPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [rate, setRate] = useState('4.5');

  const mutation = useMutation({
    mutationFn: () => destinationsApi.create({ name, rate: Number(rate) }),
    onSuccess: () => {
      toast.success('Destination created');
      navigate('/destinations');
    },
    onError: () => toast.error('Failed to create destination'),
  });

  return (
    <DashboardLayout activeNav={6} className="add-admin-page d-flex justify-c align-c mt-50">
      <NavLink to="/destinations">
        <i className="fa-solid fa-angle-left arrow-left position-absolute" />
      </NavLink>
      <div className="add-card">
        <h2 className="mb-25 text-c fw-500">Add A New Destination</h2>
        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}>
          <div className="d-flex flex-d-c mb-25">
            <label className="special-label mb-15">Name</label>
            <input className="fs-18" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label className="special-label mb-15">Rating</label>
            <input className="fs-18" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
          <button type="submit" className="add-button" disabled={mutation.isPending}>Add</button>
        </form>
      </div>
    </DashboardLayout>
  );
}
