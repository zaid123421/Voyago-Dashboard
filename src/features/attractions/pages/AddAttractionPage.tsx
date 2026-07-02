import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { attractionsApi, tripsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner } from '@/shared/components/Feedback';
import type { Destination } from '@/shared/types';

export function AddAttractionPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [rate, setRate] = useState('4.5');

  const destinations = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const res = await tripsApi.getDestinations();
      return res.data.data as Destination[];
    },
  });

  const mutation = useMutation({
    mutationFn: () =>
      attractionsApi.create({
        name,
        destination_id: Number(destinationId),
        rate: Number(rate),
      }),
    onSuccess: () => {
      toast.success('Attraction created');
      navigate('/attractions');
    },
    onError: () => toast.error('Failed to create attraction'),
  });

  if (destinations.isLoading) {
    return <DashboardLayout activeNav={5}><LoadingSpinner /></DashboardLayout>;
  }

  return (
    <DashboardLayout activeNav={5} className="add-admin-page d-flex justify-c align-c mt-50">
      <NavLink to="/attractions">
        <i className="fa-solid fa-angle-left arrow-left position-absolute" />
      </NavLink>
      <div className="add-card">
        <h2 className="mb-25 text-c fw-500">Add A New Attraction</h2>
        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}>
          <div className="d-flex flex-d-c mb-25">
            <label className="special-label mb-15">Name</label>
            <input className="fs-18" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label className="special-label mb-15">Destination</label>
            <select className="admin-select fs-15" value={destinationId} onChange={(e) => setDestinationId(e.target.value)}>
              <option value="">Select</option>
              {destinations.data?.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
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
