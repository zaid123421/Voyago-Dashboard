import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import type { AdminRole } from '@/shared/types';

export function AddAdminPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AdminRole>('Admin');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => adminsApi.create({ username, email, password, role }),
    onSuccess: () => {
      toast.success('Admin created');
      navigate('/admins');
    },
    onError: () => toast.error('Failed to create admin'),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (password.length < 8) return;
    mutation.mutate();
  }

  return (
    <DashboardLayout activeNav={2} className="add-admin-page d-flex align-c justify-c">
      <NavLink to="/admins">
        <i className="fa-solid fa-angle-left arrow-left" />
      </NavLink>
      <div className="add-card">
        <h2 className="fw-500 mb-25 text-c">Add A New Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-d-c mb-25">
            <label htmlFor="username" className="special-label mb-15">Username</label>
            <input className="fs-18" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label htmlFor="email" className="special-label mb-15">Email</label>
            <input className="fs-18" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label htmlFor="password" className="special-label mb-15">Password</label>
            <input className="fs-18" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {submitted && password.length < 8 && <p className="color-red fs-14">Min 8 characters</p>}
          </div>
          <div className="div-select">
            <label className="special-label mr-15 mb-15">Role</label>
            <select className="admin-select cursor-p fs-15" value={role} onChange={(e) => setRole(e.target.value as AdminRole)}>
              <option value="Admin">Admin</option>
              <option value="Accountant">Accountant</option>
              <option value="Trips Organizer">Trips Organizer</option>
            </select>
            <i className="fa-solid fa-chevron-down arrow-select cursor-p position-relative" />
          </div>
          <button type="submit" className="add-button" disabled={mutation.isPending}>
            {mutation.isPending ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
