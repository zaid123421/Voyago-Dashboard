import { useAuth } from '@/shared/context/AuthContext';
import { DarkModeToggle } from './DarkModeToggle';

const AVATAR_URL = 'https://api.dicebear.com/7.x/avataaars/svg?seed=voyago';

export function Header() {
  const { auth } = useAuth();

  return (
    <div className="header d-flex align-c">
      <div className="d-flex align-c">
        <div className="dark-mode-container">
          <DarkModeToggle />
        </div>
        <div className="avatar-text d-flex flex-d-c justify-c">
          <h3 className="fw-600">{auth.userName ?? 'Admin'}</h3>
          <h4 className="fs-14 fw-500">{auth.userRole ?? 'Viewer'}</h4>
        </div>
        <img alt="avatar" src={AVATAR_URL} className="header-avatar" />
      </div>
    </div>
  );
}
