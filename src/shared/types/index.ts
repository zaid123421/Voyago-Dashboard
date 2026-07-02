export type AdminRole = 'Super Admin' | 'Admin' | 'Accountant' | 'Trips Organizer';

export interface Admin {
  id: number;
  username: string;
  email: string;
  role: AdminRole;
  password?: string;
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  balance: number;
  password?: string;
  createdAt: string;
}

export interface Destination {
  id: number;
  name: string;
  rate: number;
  description?: string;
  Images: { url: string }[];
  createdAt: string;
}

export interface Attraction {
  id: number;
  name: string;
  rate: number;
  destinationId: number;
  Images: { url: string }[];
  createdAt: string;
}

export interface TripRate {
  id: number;
  name: string;
  rate: number;
  capacity: number;
  available_capacity: number;
  avilable: number;
  start_date: string;
  end_date: string;
  trip_price: number;
}

export interface TripCard {
  rate: TripRate;
  Destenation: string;
  duration: number;
  images: { url: string }[];
}

export interface Trip {
  id: number;
  name: string;
  destinationId: number;
  destinationName: string;
  duration: number;
  rate: number;
  capacity: number;
  available_capacity: number;
  avilable: number;
  start_date: string;
  end_date: string;
  trip_price: number;
  images: { url: string }[];
  createdAt: string;
}

export interface Reservation {
  id: number;
  userId: number;
  tripId: number;
  User: { id: number; username: string };
  Trip: { id: number; name: string };
  createdAt: string;
}

export interface Transaction {
  id: number;
  type: 'Credit' | 'Debit';
  status: 'Success' | 'pending' | 'Failed';
  amount: number;
  userId: number;
  adminId?: number;
  wallet: { User: { username: string } };
  Admin?: { username: string };
  createdAt: string;
}

export interface ChargeRequest {
  id: number;
  userId: number;
  amount: number;
  bank_ticket: string;
  status: 'pending' | 'approved' | 'rejected';
  User: { id: number; username: string };
  createdAt: string;
}

export interface DeleteProfileRequest {
  id: number;
  userId: number;
  User: { id: number; username: string; wallet: { balance: number } };
  createdAt: string;
}

export interface AuthUser {
  email: string;
  password: string;
  name: string;
  role: AdminRole;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  name: string;
  role: AdminRole;
}

export interface OverviewStats {
  total_users: number;
  total_booking: number;
  todayUsers: number;
  todayBookings: number;
}

export interface TopTrip {
  name: string;
  rate: number;
  bookings: number;
}

export interface TopDestination {
  name: string;
  rate: number;
}

export interface FeatureIncluded {
  id: number;
  name: string;
}

export interface VisitorStat {
  id: number;
  Month: string;
  Visitors: number;
}

export interface AuthState {
  userAccessToken?: string;
  userRefreshToken?: string;
  userName?: string;
  userRole?: AdminRole;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
