import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { usersApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';

export function AddUserPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => usersApi.create({ username, email, password }),
    onSuccess: () => {
      toast.success('User created');
      navigate('/users');
    },
    onError: () => toast.error('Failed to create user'),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (password.length < 8) return;
    mutation.mutate();
  }

  return (
    <DashboardLayout activeNav={3} className="add-admin-page d-flex justify-c align-c mt-50">
      <NavLink to="/users">
        <i className="fa-solid fa-angle-left arrow-left position-absolute" />
      </NavLink>
      <div className="add-card">
        <h2 className="mb-25 text-c fw-500">Add A New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-d-c mb-25">
            <label htmlFor="username" className="special-label mb-15">Username</label>
            <input className="fs-18" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter User's Username" />
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label htmlFor="email" className="special-label mb-15">Email</label>
            <input className="fs-18" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter User's Email" />
          </div>
          <div className="d-flex flex-d-c mb-25">
            <label htmlFor="pass" className="special-label mb-15">Password</label>
            <input className="fs-18" id="pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter User's Password" />
            {submitted && password.length < 8 && <p className="color-red fs-14">Min 8 characters</p>}
          </div>
          <button type="submit" className="add-button" disabled={mutation.isPending}>
            {mutation.isPending ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
