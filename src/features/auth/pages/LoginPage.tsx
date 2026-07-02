import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '@/api/endpoints';
import { useAuth } from '@/shared/context/AuthContext';
import { useEmail } from '@/shared/context/EmailContext';
import { ApiError } from '@/api/errors';

import { logoLogin } from '@/shared/assets/images';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginPending } = useAuth();
  const { setEmail: setResetEmail } = useEmail();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setError('');
    if (!email || password.length < 8) return;

    setLoading(true);
    try {
      const { data } = await authApi.login(email, password);
      setResetEmail(email);
      if (data.role === 'Super Admin') {
        loginPending({
          userAccessToken: data.accessToken,
          userRefreshToken: data.refreshToken,
          userName: data.name,
          userRole: data.role,
        });
        navigate('/superadmincode');
      } else {
        login({
          userAccessToken: data.accessToken,
          userRefreshToken: data.refreshToken,
          userName: data.name,
          userRole: data.role,
        });
        toast.success(`Welcome back, ${data.name}!`);
        navigate('/dashboard');
      }
    } catch (err) {
      const msg = err instanceof ApiError ? 'Invalid Email or Password' : 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card position-absolute">
      <div className="first-child">
        <h1 className="mt-75 mb-50">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box d-flex flex-d-c mb-15">
            <label className="mb-15" htmlFor="login-email-input">Email</label>
            <input
              autoFocus
              className="main-input"
              id="login-email-input"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email.length === 0 && submitted && (
              <p className="error fs-14 position-absolute color-red">Please Enter Your Email</p>
            )}
            {error && (
              <p className="error-bottom fs-14 position-absolute color-red">{error}</p>
            )}
          </div>
          <div className="input-box d-flex flex-d-c">
            <label className="mb-15" htmlFor="login-password-input">Password</label>
            <input
              className="main-input"
              id="login-password-input"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && submitted && (
              <p className="error fs-14 position-absolute color-red">
                Password must be at least 8 characters
              </p>
            )}
          </div>
          <div>
            <NavLink className="mt-15 fs-14" to="/forgotpassword">Forgot Password ?</NavLink>
          </div>
          <button type="submit" className="special-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="demo-hint fs-12 mt-15">
          Demo: admin@voyago.com / admin12345
        </p>
      </div>
      <div className="second-child">
        <div className="login-text">
          <h1>Welcome To Voyago Dashboard !</h1>
          <p className="fs-18 fw-500 mt-15">Sign in to Access Admin Dashboard</p>
        </div>
        <img className="logo" src={logoLogin} alt="Logo" />
      </div>
    </div>
  );
}
