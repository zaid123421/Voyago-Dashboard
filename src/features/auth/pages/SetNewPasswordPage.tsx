import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '@/api/endpoints';
import { useEmail } from '@/shared/context/EmailContext';
import { ApiError } from '@/api/errors';

export function SetNewPasswordPage() {
  const { email } = useEmail();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (password.length < 8 || password !== confirm) return;
    setLoading(true);
    try {
      await authApi.resetPassword(email, password, 123456);
      toast.success('Password updated successfully');
      navigate('/');
    } catch (err) {
      if (err instanceof ApiError) toast.error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card position-absolute">
      <div className="first-child">
        <div className="back-to-login mt-15">
          <NavLink to="/"><i className="fa-solid fa-angle-left fs-14" /> Back To Login Page</NavLink>
        </div>
        <h1 className="mt-75 mb-30">Set New Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box d-flex flex-d-c mb-25">
            <label className="mb-15" htmlFor="new-pass">New Password</label>
            <input
              className="main-input"
              id="new-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {submitted && password.length < 8 && (
              <p className="error fs-14 color-red">Password must be at least 8 characters</p>
            )}
          </div>
          <div className="input-box d-flex flex-d-c mb-25">
            <label className="mb-15" htmlFor="confirm-pass">Confirm Password</label>
            <input
              className="main-input"
              id="confirm-pass"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            {submitted && password !== confirm && (
              <p className="error fs-14 color-red">Passwords do not match</p>
            )}
          </div>
          <button type="submit" className="special-button" disabled={loading}>
            {loading ? 'Saving...' : 'Reset Password'}
          </button>
        </form>
      </div>
      <div className="second-child">
        <div className="login-text">
          <h1>Almost Done!</h1>
          <p>Set your new password to continue</p>
        </div>
      </div>
    </div>
  );
}
