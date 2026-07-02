import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GuestOnly, PersistLogin, RequireAuth } from '@/features/auth/components/AuthGuards';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage';
import { VerifyCodePage } from '@/features/auth/pages/VerifyCodePage';
import { SetNewPasswordPage } from '@/features/auth/pages/SetNewPasswordPage';
import { SuperAdminCodePage } from '@/features/auth/pages/SuperAdminCodePage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { AdminsListPage } from '@/features/admins/pages/AdminsListPage';
import { AddAdminPage } from '@/features/admins/pages/AddAdminPage';
import { AdminDetailsPage } from '@/features/admins/pages/AdminDetailsPage';
import { UsersListPage } from '@/features/users/pages/UsersListPage';
import { AddUserPage } from '@/features/users/pages/AddUserPage';
import { UserDetailsPage } from '@/features/users/pages/UserDetailsPage';
import { TripsListPage } from '@/features/trips/pages/TripsListPage';
import { AddTripPage } from '@/features/trips/pages/AddTripPage';
import { AttractionsListPage } from '@/features/attractions/pages/AttractionsListPage';
import { AddAttractionPage } from '@/features/attractions/pages/AddAttractionPage';
import { DestinationsListPage } from '@/features/destinations/pages/DestinationsListPage';
import { AddDestinationPage } from '@/features/destinations/pages/AddDestinationPage';
import { DestinationDetailsPage } from '@/features/destinations/pages/DestinationDetailsPage';
import { ReservationsListPage } from '@/features/reservations/pages/ReservationsListPage';
import { TransactionsListPage } from '@/features/transactions/pages/TransactionsListPage';
import { TransactionRequestsPage } from '@/features/transactions/pages/TransactionRequestsPage';
import { RequestsListPage } from '@/features/requests/pages/RequestsListPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <div style={{ color: 'white' }}>
        <Routes>
          <Route path="/" element={<GuestOnly><LoginPage /></GuestOnly>} />
          <Route path="/forgotpassword" element={<GuestOnly><ForgotPasswordPage /></GuestOnly>} />
          <Route path="/verifycode" element={<GuestOnly><VerifyCodePage /></GuestOnly>} />
          <Route path="/setnewpassword" element={<GuestOnly><SetNewPasswordPage /></GuestOnly>} />
          <Route path="/superadmincode" element={<SuperAdminCodePage />} />

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
      </div>
    </BrowserRouter>
  );
}
