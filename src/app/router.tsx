import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GuestOnly, PersistLogin, RequireAuth, RequireResetEmail, RequireSuperAdmin2FA } from '@/features/auth/components/AuthGuards';
import { LoadingScreen } from '@/shared/components/Feedback';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const VerifyCodePage = lazy(() => import('@/features/auth/pages/VerifyCodePage').then((m) => ({ default: m.VerifyCodePage })));
const SetNewPasswordPage = lazy(() => import('@/features/auth/pages/SetNewPasswordPage').then((m) => ({ default: m.SetNewPasswordPage })));
const SuperAdminCodePage = lazy(() => import('@/features/auth/pages/SuperAdminCodePage').then((m) => ({ default: m.SuperAdminCodePage })));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const AdminsListPage = lazy(() => import('@/features/admins/pages/AdminsListPage').then((m) => ({ default: m.AdminsListPage })));
const AddAdminPage = lazy(() => import('@/features/admins/pages/AddAdminPage').then((m) => ({ default: m.AddAdminPage })));
const AdminDetailsPage = lazy(() => import('@/features/admins/pages/AdminDetailsPage').then((m) => ({ default: m.AdminDetailsPage })));
const UsersListPage = lazy(() => import('@/features/users/pages/UsersListPage').then((m) => ({ default: m.UsersListPage })));
const AddUserPage = lazy(() => import('@/features/users/pages/AddUserPage').then((m) => ({ default: m.AddUserPage })));
const UserDetailsPage = lazy(() => import('@/features/users/pages/UserDetailsPage').then((m) => ({ default: m.UserDetailsPage })));
const TripsListPage = lazy(() => import('@/features/trips/pages/TripsListPage').then((m) => ({ default: m.TripsListPage })));
const AddTripPage = lazy(() => import('@/features/trips/pages/AddTripPage').then((m) => ({ default: m.AddTripPage })));
const AttractionsListPage = lazy(() => import('@/features/attractions/pages/AttractionsListPage').then((m) => ({ default: m.AttractionsListPage })));
const AddAttractionPage = lazy(() => import('@/features/attractions/pages/AddAttractionPage').then((m) => ({ default: m.AddAttractionPage })));
const DestinationsListPage = lazy(() => import('@/features/destinations/pages/DestinationsListPage').then((m) => ({ default: m.DestinationsListPage })));
const AddDestinationPage = lazy(() => import('@/features/destinations/pages/AddDestinationPage').then((m) => ({ default: m.AddDestinationPage })));
const DestinationDetailsPage = lazy(() => import('@/features/destinations/pages/DestinationDetailsPage').then((m) => ({ default: m.DestinationDetailsPage })));
const ReservationsListPage = lazy(() => import('@/features/reservations/pages/ReservationsListPage').then((m) => ({ default: m.ReservationsListPage })));
const TransactionsListPage = lazy(() => import('@/features/transactions/pages/TransactionsListPage').then((m) => ({ default: m.TransactionsListPage })));
const TransactionRequestsPage = lazy(() => import('@/features/transactions/pages/TransactionRequestsPage').then((m) => ({ default: m.TransactionRequestsPage })));
const RequestsListPage = lazy(() => import('@/features/requests/pages/RequestsListPage').then((m) => ({ default: m.RequestsListPage })));

function PageLoader() {
  return <LoadingScreen />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <div style={{ color: 'white' }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<GuestOnly><LoginPage /></GuestOnly>} />
            <Route path="/forgotpassword" element={<GuestOnly><ForgotPasswordPage /></GuestOnly>} />
            <Route path="/verifycode" element={<GuestOnly><RequireResetEmail><VerifyCodePage /></RequireResetEmail></GuestOnly>} />
            <Route path="/setnewpassword" element={<GuestOnly><RequireResetEmail><SetNewPasswordPage /></RequireResetEmail></GuestOnly>} />
            <Route path="/superadmincode" element={<RequireSuperAdmin2FA><SuperAdminCodePage /></RequireSuperAdmin2FA>} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admins" element={<AdminsListPage />} />
                <Route path="/addadmin" element={<AddAdminPage />} />
                <Route path="/admins/:id" element={<AdminDetailsPage />} />
                <Route path="/users" element={<UsersListPage />} />
                <Route path="/adduser" element={<AddUserPage />} />
                <Route path="/users/:id" element={<UserDetailsPage />} />
                <Route path="/trips" element={<TripsListPage />} />
                <Route path="/addtrip" element={<AddTripPage />} />
                <Route path="/attractions" element={<AttractionsListPage />} />
                <Route path="/addattraction" element={<AddAttractionPage />} />
                <Route path="/destinations" element={<DestinationsListPage />} />
                <Route path="/adddestination" element={<AddDestinationPage />} />
                <Route path="/destinationdetails" element={<DestinationDetailsPage />} />
                <Route path="/reservations" element={<ReservationsListPage />} />
                <Route path="/transactions" element={<TransactionsListPage />} />
                <Route path="/transactionrequests" element={<TransactionRequestsPage />} />
                <Route path="/requests" element={<RequestsListPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
