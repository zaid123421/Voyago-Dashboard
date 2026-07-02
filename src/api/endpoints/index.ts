import { apiClient } from '../client';
import type {
  Admin,
  LoginResponse,
  OverviewStats,
  TopDestination,
  TopTrip,
  User,
  VisitorStat,
} from '@/shared/types';

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<LoginResponse>('/login', { email, password }),
  logout: (refreshToken: string) =>
    apiClient.delete('/logout', { data: { refresh_token: refreshToken } }),
  forgotPassword: (email: string) =>
    apiClient.post('/forget_password', { email }),
  verifyCode: (email: string, cod: number) =>
    apiClient.post('/check_verification_code', { email, cod }),
  resetPassword: (email: string, password: string, cod: number) =>
    apiClient.post('/reset_password', { email, password, cod }),
};

export const adminsApi = {
  getAll: () => apiClient.get<{ admins: Admin[] }>('/admins'),
  getById: (id: string) => apiClient.get(`/admins/${id}`),
  create: (data: { username: string; email: string; password: string; role: string }) =>
    apiClient.post('/add_admin', data),
  delete: (id: number) => apiClient.delete(`/delete_admin/${id}`),
};

export const usersApi = {
  getAll: () => apiClient.get<{ users: User[] }>('/users'),
  getById: (id: string) => apiClient.get(`/users/${id}`),
  create: (data: { username: string; email: string; password: string }) =>
    apiClient.post('/add_user', data),
  delete: (id: number) => apiClient.delete(`/delete_user/${id}`),
};

export const tripsApi = {
  getCards: () => apiClient.get('/trip_cards'),
  getFeatures: () => apiClient.get('/features_included'),
  getDestinations: () => apiClient.get('/destenations'),
  getAttractions: () => apiClient.get('/attractions'),
  create: (data: Record<string, unknown>) => apiClient.post('/add_trip', data),
  uploadImages: () => apiClient.post('/upload_trip_images'),
  delete: (id: number) => apiClient.delete(`/delete_trip/${id}`),
};

export const attractionsApi = {
  getAll: () => apiClient.get('/attractions'),
  create: (data: { name: string; destination_id: number; rate?: number }) =>
    apiClient.post('/add_attraction', data),
};

export const destinationsApi = {
  getAll: () => apiClient.get('/destenations'),
  create: (data: { name: string; rate?: number }) =>
    apiClient.post('/add_destenation', data),
};

export const reservationsApi = {
  getAll: () => apiClient.get('/show_all_reservations'),
  delete: (id: number) => apiClient.delete(`/delete_reservation_by_id/${id}`),
};

export const transactionsApi = {
  getAll: () => apiClient.get('/show_all_transactions'),
  getChargeRequests: () => apiClient.get('/charge_requests'),
  approveCharge: (id: number) => apiClient.get(`/approve_charge/${id}`),
  rejectCharge: (id: number) => apiClient.get(`/reject_charge/${id}`),
};

export const requestsApi = {
  getDeleteProfileRequests: () => apiClient.get('/delete_profile_requests'),
  acceptDelete: (id: number) => apiClient.get(`/empty_then_delete/${id}`),
};

export const dashboardApi = {
  getOverview: () => apiClient.get<{ data: OverviewStats }>('/overview_users'),
  getTopTrips: () => apiClient.get<{ data: { result: TopTrip[] } }>('/top_trips'),
  getTopDestinations: () =>
    apiClient.get<{ data: { result: TopDestination[] } }>('/top_destinations'),
};

export const visitorStats: VisitorStat[] = [
  { id: 1, Month: 'January', Visitors: 510 },
  { id: 2, Month: 'February', Visitors: 400 },
  { id: 3, Month: 'March', Visitors: 780 },
  { id: 4, Month: 'April', Visitors: 1000 },
  { id: 5, Month: 'May', Visitors: 630 },
  { id: 6, Month: 'June', Visitors: 200 },
  { id: 7, Month: 'July', Visitors: 550 },
  { id: 8, Month: 'August', Visitors: 800 },
  { id: 9, Month: 'September', Visitors: 900 },
  { id: 10, Month: 'October', Visitors: 700 },
  { id: 11, Month: 'November', Visitors: 500 },
  { id: 12, Month: 'December', Visitors: 300 },
];
