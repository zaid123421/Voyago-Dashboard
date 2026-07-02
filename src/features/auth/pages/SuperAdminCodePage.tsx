import { useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '@/api/endpoints';
import { useEmail } from '@/shared/context/EmailContext';
import { ApiError } from '@/api/errors';

const LOGO_URL = 'https://api.dicebear.com/7.x/shapes/svg?seed=voyago';

export function SuperAdminCodePage() {
  const { email } = useEmail();
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

  useEffect(() => {
    if (email) authApi.forgotPassword(email).catch(() => {});
  }, [email]);

  function handleChange(index: number, value: string) {
    if (value.length > 1) return;
    const next = [...inputs];
    next[index] = value;
    setInputs(next);
    if (value && index < 5) refs[index + 1].current?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = parseInt(inputs.join(''), 10);
    setLoading(true);
    try {
      await authApi.verifyCode(email, code);
      toast.success('Verification successful');
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof ApiError) setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card super-admin-card position-absolute">
      <div className="first-child">
        <div className="back-to-login mt-15 mr-50">
          <NavLink to="/">
            <i className="fa-solid fa-angle-left fs-14 ml-20" /> Back To Login Page
          </NavLink>
        </div>
        <h1 className="mt-75 mb-30">Sign in</h1>
        <p className="mb-50 fs-15">Enter the verification code we sent to your email</p>
        <form onSubmit={handleSubmit}>
          <div className="five-fields d-flex justify-c align-c">
            {inputs.map((val, i) => (
              <input
                key={i}
                ref={refs[i]}
                autoFocus={i === 0}
                className="second-input mb-30"
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(i, e.target.value)}
              />
            ))}
            {error && <p className="error-verify fs-14 position-absolute color-red">Invalid Code</p>}
          </div>
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
        <img className="admin-logo" src={LOGO_URL} alt="Logo" />
      </div>
    </div>
  );
}
