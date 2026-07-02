import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import Cookies from 'universal-cookie';
import type { AuthState, AdminRole } from '@/shared/types';

const cookies = new Cookies();

interface AuthContextValue {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  login: (auth: AuthState) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readAuthFromCookies(): AuthState {
  return {
    userAccessToken: cookies.get('userAccessToken'),
    userRefreshToken: cookies.get('userRefreshToken'),
    userName: cookies.get('userName'),
    userRole: cookies.get('userRole') as AdminRole | undefined,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>(readAuthFromCookies);

  const setAuth = useCallback((newAuth: AuthState) => {
    setAuthState(newAuth);
    if (newAuth.userAccessToken) cookies.set('userAccessToken', newAuth.userAccessToken, { path: '/' });
    if (newAuth.userRefreshToken) cookies.set('userRefreshToken', newAuth.userRefreshToken, { path: '/' });
    if (newAuth.userName) cookies.set('userName', newAuth.userName, { path: '/' });
    if (newAuth.userRole) cookies.set('userRole', newAuth.userRole, { path: '/' });
  }, []);

  const login = useCallback((newAuth: AuthState) => {
    setAuth(newAuth);
  }, [setAuth]);

  const logout = useCallback(() => {
    cookies.remove('userAccessToken', { path: '/' });
    cookies.remove('userRefreshToken', { path: '/' });
    cookies.remove('userName', { path: '/' });
    cookies.remove('userRole', { path: '/' });
    setAuthState({});
  }, []);

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      login,
      logout,
      isAuthenticated: Boolean(auth.userAccessToken),
    }),
    [auth, setAuth, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
