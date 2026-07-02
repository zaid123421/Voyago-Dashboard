import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { tripsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner } from '@/shared/components/Feedback';
import type { Destination } from '@/shared/types';

export function AddTripPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [duration, setDuration] = useState('3');
  const [capacity, setCapacity] = useState('100');
  const [tripPrice, setTripPrice] = useState('500');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const destinations = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const res = await tripsApi.getDestinations();
      return res.data.data as Destination[];
    },
  });

  const mutation = useMutation({
    mutationFn: () =>
      tripsApi.create({
        name,
        destination_id: Number(destinationId),
        duration: Number(duration),
        capacity: Number(capacity),
        trip_price: Number(tripPrice),
        start_date: startDate,
        end_date: endDate,
      }),
    onSuccess: () => {
      toast.success('Trip created');
      navigate('/trips');
    },
    onError: () => toast.error('Failed to create trip'),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !destinationId || !startDate || !endDate) {
      toast.error('Please fill all required fields');
      return;
    }
    mutation.mutate();
  }

  if (destinations.isLoading) {
    return <DashboardLayout activeNav={4}><LoadingSpinner /></DashboardLayout>;
  }

  return (
    <DashboardLayout activeNav={4} className="add-admin-page d-flex justify-c align-c mt-50">
      <NavLink to="/trips">
        <i className="fa-solid fa-angle-left arrow-left position-absolute" />
      </NavLink>
      <div className="add-card add-trip-card">
        <h2 className="mb-25 text-c fw-500">Add A New Trip</h2>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-d-c mb-25">
            <label className="special-label mb-15">Trip Name</label>
            <input className="fs-18" value={name} onChange={(e) => setName(e.target.value)} placeholder="Trip name" />
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label className="special-label mb-15">Destination</label>
            <select className="admin-select fs-15" value={destinationId} onChange={(e) => setDestinationId(e.target.value)}>
              <option value="">Select destination</option>
              {destinations.data?.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label className="special-label mb-15">Duration (days)</label>
            <input className="fs-18" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label className="special-label mb-15">Capacity</label>
            <input className="fs-18" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label className="special-label mb-15">Price ($)</label>
            <input className="fs-18" type="number" value={tripPrice} onChange={(e) => setTripPrice(e.target.value)} />
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label className="special-label mb-15">Start Date</label>
            <input className="fs-18" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label className="special-label mb-15">End Date</label>
            <input className="fs-18" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <button type="submit" className="add-button" disabled={mutation.isPending}>
            {mutation.isPending ? 'Adding...' : 'Add Trip'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
