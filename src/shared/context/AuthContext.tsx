import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AuthState } from '@/shared/types';
import {
  authCookies,
  clearAuthCookies,
  isFullyAuthenticated,
  readAuthFromCookies,
  setTwoFactorVerified,
} from '@/shared/utils/auth';

const PENDING_AUTH_KEY = 'pendingAuth';

interface AuthContextValue {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  login: (auth: AuthState) => void;
  loginPending: (auth: AuthState) => void;
  completePendingLogin: () => boolean;
  hasPendingAuth: () => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function sanitizeStoredAuth(): AuthState {
  const stored = readAuthFromCookies();
  if (stored.userAccessToken && stored.userRole === 'Super Admin' && !isFullyAuthenticated(stored)) {
    clearAuthCookies();
    return {};
  }
  return stored;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>(sanitizeStoredAuth);

  const setAuth = useCallback((newAuth: AuthState) => {
    setAuthState(newAuth);
    if (newAuth.userAccessToken) authCookies.set('userAccessToken', newAuth.userAccessToken, { path: '/' });
    if (newAuth.userRefreshToken) authCookies.set('userRefreshToken', newAuth.userRefreshToken, { path: '/' });
    if (newAuth.userName) authCookies.set('userName', newAuth.userName, { path: '/' });
    if (newAuth.userRole) authCookies.set('userRole', newAuth.userRole, { path: '/' });
  }, []);

  const login = useCallback((newAuth: AuthState) => {
    if (newAuth.userRole !== 'Super Admin') {
      authCookies.remove('twoFactorVerified', { path: '/' });
    }
    setAuth(newAuth);
  }, [setAuth]);

  const loginPending = useCallback((newAuth: AuthState) => {
    clearAuthCookies();
    setAuthState({});
    sessionStorage.setItem(PENDING_AUTH_KEY, JSON.stringify(newAuth));
  }, []);

  const hasPendingAuth = useCallback(() => {
    return Boolean(sessionStorage.getItem(PENDING_AUTH_KEY));
  }, []);

  const completePendingLogin = useCallback(() => {
    const raw = sessionStorage.getItem(PENDING_AUTH_KEY);
    if (!raw) return false;
    try {
      const pending = JSON.parse(raw) as AuthState;
      sessionStorage.removeItem(PENDING_AUTH_KEY);
      setTwoFactorVerified();
      setAuth(pending);
      return true;
    } catch {
      sessionStorage.removeItem(PENDING_AUTH_KEY);
      return false;
    }
  }, [setAuth]);

  const logout = useCallback(() => {
    clearAuthCookies();
    sessionStorage.removeItem(PENDING_AUTH_KEY);
    setAuthState({});
  }, []);

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      login,
      loginPending,
      completePendingLogin,
      hasPendingAuth,
      logout,
      isAuthenticated: isFullyAuthenticated(auth),
    }),
    [auth, setAuth, login, loginPending, completePendingLogin, hasPendingAuth, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
