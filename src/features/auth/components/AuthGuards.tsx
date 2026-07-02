import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/shared/context/AuthContext';
import { cookies } from '@/api/client';

export function RequireAuth() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}

export function PersistLogin() {
  const { auth, login } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function refresh() {
      const refreshToken = cookies.get('userRefreshToken') as string | undefined;
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
        login({
          userAccessToken: data.accessToken,
          userRefreshToken: data.refreshToken,
          userName: data.name,
          userRole: data.role,
        });
      } catch {
        cookies.remove('userRefreshToken', { path: '/' });
      } finally {
        setLoading(false);
      }
    }
    refresh();
  }, [auth.userAccessToken, login]);

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
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
