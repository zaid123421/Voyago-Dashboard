import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '@/api/endpoints';
import { useAuth } from '@/shared/context/AuthContext';
import { useEmail } from '@/shared/context/EmailContext';
import { ApiError } from '@/api/errors';

import { logoLogin } from '@/shared/assets/images';

export function SuperAdminCodePage() {
  const { email } = useEmail();
  const { completePendingLogin } = useAuth();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  function handleChange(index: number, value: string) {
    if (value.length > 1) return;
    const next = [...inputs];
    next[index] = value;
    setInputs(next);
    setError(false);
    if (value && index < 5) refs[index + 1].current?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const codeStr = inputs.join('');
    if (codeStr.length < 6) return;
    const code = parseInt(codeStr, 10);
    setLoading(true);
    try {
      await authApi.verifyCode(email, code);
      if (!completePendingLogin()) {
        toast.error('Session expired. Please sign in again.');
        navigate('/');
        return;
      }
      toast.success('Verification successful');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      if (err instanceof ApiError) setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card super-admin-card position-absolute">
      <div className="first-child">
        <div className="back-to-login mt-15">
          <NavLink to="/" onClick={() => sessionStorage.removeItem('pendingAuth')}>
            <i className="fa-solid fa-angle-left fs-14" /> Back to Login
          </NavLink>
        </div>
        <h1 className="mt-75 mb-30">Sign in</h1>
        <p className="mb-50 fs-15">Enter the verification code we sent to your email</p>
        <form onSubmit={handleSubmit} className="verify-form">
          <div className="five-fields">
            {inputs.map((val, i) => (
              <input
                key={i}
                ref={refs[i]}
                autoFocus={i === 0}
                className="second-input"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(i, e.target.value.replace(/\D/g, ''))}
              />
            ))}
          </div>
          {error && <p className="error-verify fs-14 color-red">Invalid Code</p>}
          <p className="demo-hint fs-12 mb-15 text-c">Demo code: 123456</p>
          <button type="submit" className="special-button" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
      <div className="second-child">
        <div className="login-text">
          <h1>Welcome To Voyago Dashboard !</h1>
          <p>Sign in to Access Admin Dashboard</p>
        </div>
        <img className="admin-logo" src={logoLogin} alt="Logo" />
      </div>
    </div>
  );
}
