import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/context/AuthContext';
import { useTheme } from '@/shared/context/ThemeContext';
import { authApi } from '@/api/endpoints';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { to: '/dashboard', icon: 'fa-chart-simple', label: 'Dashboard', num: 1 },
  { to: '/admins', icon: 'fa-user-tie', label: 'Admins', num: 2 },
  { to: '/users', icon: 'fa-users', label: 'Users', num: 3 },
  { to: '/trips', icon: 'fa-briefcase', label: 'Trips', num: 4 },
  { to: '/attractions', icon: 'fa-globe', label: 'Attractions', num: 5 },
  { to: '/destinations', icon: 'fa-location-dot', label: 'Destinations', num: 6 },
  { to: '/reservations', icon: 'fa-table-list', label: 'Reservations', num: 7 },
  { to: '/transactions', icon: 'fa-money-bill-transfer', label: 'Transactions', num: 8 },
  { to: '/requests', icon: 'fa-hand', label: 'Requests', num: 9 },
] as const;

interface SidebarProps {
  activeNav: number;
}

export function Sidebar({ activeNav }: SidebarProps) {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const { theme } = useTheme();

  async function handleLogout() {
    try {
      if (auth.userRefreshToken) {
        await authApi.logout(auth.userRefreshToken);
      }
    } catch {
      // proceed with local logout
    }
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  }

  return (
    <div className="sidebar">
      <div className="logo-text mb-20 d-flex justify-c">
        <span className={`logo-wordmark ${theme}`}>Voyago</span>
      </div>
      <div className="nav-links d-flex flex-d-c">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={
              activeNav === item.num
                ? 'active-link d-flex align-c item-link'
                : 'd-flex align-c item-link'
            }
          >
            <i className={`fa-solid ${item.icon} fs-18`} />
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button type="button" onClick={handleLogout} className="d-flex align-c item-link logout">
          <i className="fa-solid fa-arrow-right-from-bracket fs-18" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
