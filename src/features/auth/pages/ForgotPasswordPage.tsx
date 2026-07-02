import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authApi } from '@/api/endpoints';
import { useEmail } from '@/shared/context/EmailContext';
import { ApiError } from '@/api/errors';

import { forgotPasswordImg } from '@/shared/assets/images';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setEmail: setContextEmail } = useEmail();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!email) return;
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setContextEmail(email);
      navigate('/verifycode');
    } catch (err) {
      if (err instanceof ApiError) setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card position-absolute">
      <div className="first-child align-s">
        <div className="back-to-login mt-15">
          <NavLink to="/">
            <i className="fa-solid fa-angle-left fs-14" /> Back To Login Page
          </NavLink>
        </div>
        <form onSubmit={handleSubmit} className="d-flex flex-d-c mt-75">
          <h2>Forgot Your Password?</h2>
          <p className="mt-50 fs-15">Please enter your email below to recover your password</p>
          <label className="mt-50 mb-15" htmlFor="forgot">Email</label>
          <input
            className="main-input"
            id="forgot"
            placeholder="Enter Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {submitted && error && (
            <p className="error-forgot fs-14 position-absolute color-red">Invalid Email</p>
          )}
          <button type="submit" className="special-button" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
      <div className="second-child">
        <img className="forgot-password-img" src={forgotPasswordImg} alt="Forgot password" />
      </div>
    </div>
  );
}
