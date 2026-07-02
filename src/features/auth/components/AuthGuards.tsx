import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/shared/context/AuthContext';
import { authCookies, isTwoFactorVerified } from '@/shared/utils/auth';

export function RequireAuth() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}

export function PersistLogin() {
  const { auth, login, loginPending } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function refresh() {
      const refreshToken = authCookies.get('userRefreshToken') as string | undefined;
      if (!refreshToken) {
        setLoading(false);
        return;
      }
      if (auth.userAccessToken) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.post('/web/token', {
          refresh_token: refreshToken,
        });
        const nextAuth = {
          userAccessToken: data.accessToken,
          userRefreshToken: data.refreshToken,
          userName: data.name,
          userRole: data.role,
        };
        if (data.role === 'Super Admin' && !isTwoFactorVerified()) {
          loginPending(nextAuth);
        } else {
          login(nextAuth);
        }
      } catch {
        authCookies.remove('userRefreshToken', { path: '/' });
        authCookies.remove('userAccessToken', { path: '/' });
        authCookies.remove('userName', { path: '/' });
        authCookies.remove('userRole', { path: '/' });
        authCookies.remove('twoFactorVerified', { path: '/' });
      } finally {
        setLoading(false);
      }
    }
    refresh();
  }, [auth.userAccessToken, login, loginPending]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
      </div>
    );
  }

  return <Outlet />;
}

export function GuestOnly({ children }: { children: ReactNode }) {
  const { isAuthenticated, hasPendingAuth } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  if (hasPendingAuth()) return <Navigate to="/superadmincode" replace />;
  return <>{children}</>;
}

export function RequireSuperAdmin2FA({ children }: { children: ReactNode }) {
  const { isAuthenticated, hasPendingAuth } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  if (!hasPendingAuth()) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export function RequireResetEmail({ children }: { children: ReactNode }) {
  const email = sessionStorage.getItem('resetEmail');
  if (!email) return <Navigate to="/forgotpassword" replace />;
  return <>{children}</>;
}
