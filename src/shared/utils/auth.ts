import Cookies from 'universal-cookie';
import type { AdminRole, AuthState } from '@/shared/types';

const cookies = new Cookies();

export function isTwoFactorVerified(): boolean {
  const value = cookies.get('twoFactorVerified');
  return value === true || value === 'true';
}

export function readAuthFromCookies(): AuthState {
  return {
    userAccessToken: cookies.get('userAccessToken'),
    userRefreshToken: cookies.get('userRefreshToken'),
    userName: cookies.get('userName'),
    userRole: cookies.get('userRole') as AdminRole | undefined,
  };
}

export function isFullyAuthenticated(auth: AuthState): boolean {
  const accessToken = auth.userAccessToken ?? cookies.get('userAccessToken');
  const role = (auth.userRole ?? cookies.get('userRole')) as AdminRole | undefined;
  if (!accessToken) return false;
  if (role === 'Super Admin') return isTwoFactorVerified();
  return true;
}

export function clearAuthCookies() {
  cookies.remove('userAccessToken', { path: '/' });
  cookies.remove('userRefreshToken', { path: '/' });
  cookies.remove('userName', { path: '/' });
  cookies.remove('userRole', { path: '/' });
  cookies.remove('twoFactorVerified', { path: '/' });
}

export function setTwoFactorVerified() {
  cookies.set('twoFactorVerified', 'true', { path: '/' });
}

export { cookies as authCookies };
