import type {
  Admin,
  Attraction,
  ChargeRequest,
  DeleteProfileRequest,
  Destination,
  FeatureIncluded,
  Reservation,
  Transaction,
  Trip,
  User,
  VisitorStat,
  AuthUser,
} from '@/shared/types';
import { PLACEHOLDER_IMAGE } from '@/shared/utils';

const now = new Date().toISOString();
const today = now.slice(0, 10);

export const authUsers: AuthUser[] = [
  {
    email: 'admin@voyago.com',
    password: 'admin12345',
    name: 'Zaid',
    role: 'Super Admin',
  },
  {
    email: 'manager@voyago.com',
    password: 'manager123',
    name: 'Moamen',
    role: 'Admin',
  },
];

export const admins: Admin[] = [
  { id: 1, username: 'Zaid', email: 'admin@voyago.com', role: 'Super Admin', createdAt: '2024-01-15T10:00:00.000Z' },
  { id: 2, username: 'Moamen', email: 'manager@voyago.com', role: 'Trips Organizer', createdAt: '2024-02-20T10:00:00.000Z' },
  { id: 3, username: 'Kamel', email: 'kamel@voyago.com', role: 'Accountant', createdAt: '2024-03-10T10:00:00.000Z' },
];

export const users: User[] = [
  { id: 1, username: 'Sameer', email: 'sameer@mail.com', balance: 1900, createdAt: '2024-05-01T10:00:00.000Z' },
  { id: 2, username: 'Mona', email: 'mona@mail.com', balance: 1320, createdAt: '2024-05-02T10:00:00.000Z' },
  { id: 3, username: 'Loujain', email: 'loujain@mail.com', balance: 2160, createdAt: '2024-05-03T10:00:00.000Z' },
  { id: 4, username: 'Reem', email: 'reem@mail.com', balance: 0, createdAt: '2024-05-04T10:00:00.000Z' },
  { id: 5, username: 'Jana', email: 'jana@mail.com', balance: 0, createdAt: '2024-05-05T10:00:00.000Z' },
  { id: 6, username: 'Hamza', email: 'hamza@mail.com', balance: 540, createdAt: '2024-05-06T10:00:00.000Z' },
  { id: 7, username: 'Mohanad', email: 'mohanad@mail.com', balance: 870, createdAt: '2024-05-07T10:00:00.000Z' },
  { id: 8, username: 'Ramy', email: 'ramy@mail.com', balance: 2500, createdAt: '2024-05-08T10:00:00.000Z' },
  { id: 9, username: 'Dyaa', email: 'dyaa@mail.com', balance: 1500, createdAt: `${today}T08:00:00.000Z` },
  { id: 10, username: 'Reham', email: 'reham@mail.com', balance: 1750, createdAt: '2024-06-01T10:00:00.000Z' },
];

export const destinations: Destination[] = [
  { id: 1, name: 'Madrid', rate: 4.9, Images: [{ url: PLACEHOLDER_IMAGE(1) }], createdAt: now },
  { id: 2, name: 'Dubai', rate: 4.8, Images: [{ url: PLACEHOLDER_IMAGE(2) }], createdAt: now },
  { id: 3, name: 'Damascus', rate: 4.8, Images: [{ url: PLACEHOLDER_IMAGE(3) }], createdAt: now },
  { id: 4, name: 'Barcelona', rate: 4.7, Images: [{ url: PLACEHOLDER_IMAGE(4) }], createdAt: now },
  { id: 5, name: 'Paris', rate: 4.6, Images: [{ url: PLACEHOLDER_IMAGE(5) }], createdAt: now },
  { id: 6, name: 'Cairo', rate: 4.5, Images: [{ url: PLACEHOLDER_IMAGE(6) }], createdAt: now },
  { id: 7, name: 'London', rate: 4.4, Images: [{ url: PLACEHOLDER_IMAGE(7) }], createdAt: now },
  { id: 8, name: 'Rome', rate: 4.3, Images: [{ url: PLACEHOLDER_IMAGE(8) }], createdAt: now },
];

export const attractions: Attraction[] = [
  { id: 1, name: 'Umayyad Square', rate: 4.1, destinationId: 3, Images: [{ url: PLACEHOLDER_IMAGE(11) }], createdAt: now },
  { id: 2, name: 'Santiago Bernabue', rate: 4.6, destinationId: 1, Images: [{ url: PLACEHOLDER_IMAGE(12) }], createdAt: now },
  { id: 3, name: 'Salah al-Din Citadel', rate: 4.5, destinationId: 3, Images: [{ url: PLACEHOLDER_IMAGE(13) }], createdAt: now },
  { id: 4, name: 'Burj Khalifa', rate: 4.9, destinationId: 2, Images: [{ url: PLACEHOLDER_IMAGE(14) }], createdAt: now },
  { id: 5, name: 'Eiffel Tower', rate: 4.8, destinationId: 5, Images: [{ url: PLACEHOLDER_IMAGE(15) }], createdAt: now },
  { id: 6, name: 'Sagrada Familia', rate: 4.7, destinationId: 4, Images: [{ url: PLACEHOLDER_IMAGE(16) }], createdAt: now },
];

export const trips: Trip[] = [
  {
    id: 1, name: '3 Days in Maldiv', destinationId: 2, destinationName: 'Dubai',
    duration: 3, rate: 5, capacity: 2000, available_capacity: 232, avilable: 1,
    start_date: '2024-08-01', end_date: '2024-08-04', trip_price: 1200,
    images: [{ url: PLACEHOLDER_IMAGE(21) }], createdAt: now,
  },
  {
    id: 2, name: 'Mountains in Syria', destinationId: 3, destinationName: 'Damascus',
    duration: 5, rate: 4.8, capacity: 500, available_capacity: 175, avilable: 1,
    start_date: '2024-09-10', end_date: '2024-09-15', trip_price: 850,
    images: [{ url: PLACEHOLDER_IMAGE(22) }], createdAt: now,
  },
  {
    id: 3, name: 'Paris Life', destinationId: 5, destinationName: 'Paris',
    duration: 4, rate: 4.9, capacity: 800, available_capacity: 251, avilable: 1,
    start_date: '2024-10-01', end_date: '2024-10-05', trip_price: 1500,
    images: [{ url: PLACEHOLDER_IMAGE(23) }], createdAt: now,
  },
  {
    id: 4, name: 'Great Moments in Madrid', destinationId: 1, destinationName: 'Madrid',
    duration: 3, rate: 4.7, capacity: 600, available_capacity: 100, avilable: 1,
    start_date: '2024-11-01', end_date: '2024-11-04', trip_price: 990,
    images: [{ url: PLACEHOLDER_IMAGE(24) }], createdAt: now,
  },
  {
    id: 5, name: 'Middle East Trip', destinationId: 6, destinationName: 'Cairo',
    duration: 6, rate: 4.5, capacity: 400, available_capacity: 277, avilable: 1,
    start_date: '2024-12-01', end_date: '2024-12-07', trip_price: 1100,
    images: [{ url: PLACEHOLDER_IMAGE(25) }], createdAt: now,
  },
  {
    id: 6, name: 'Barcelona Beach', destinationId: 4, destinationName: 'Barcelona',
    duration: 4, rate: 4.6, capacity: 350, available_capacity: 50, avilable: 1,
    start_date: '2024-07-15', end_date: '2024-07-19', trip_price: 1050,
    images: [{ url: PLACEHOLDER_IMAGE(26) }], createdAt: now,
  },
];

export const reservations: Reservation[] = [
  { id: 12, userId: 1, tripId: 2, User: { id: 1, username: 'Sameer' }, Trip: { id: 2, name: 'Mountains in Syria' }, createdAt: `${today}T12:00:00.000Z` },
  { id: 13, userId: 2, tripId: 5, User: { id: 2, username: 'Mona' }, Trip: { id: 5, name: 'Middle East Trip' }, createdAt: '2024-08-23T10:00:00.000Z' },
  { id: 14, userId: 3, tripId: 5, User: { id: 3, username: 'Loujain' }, Trip: { id: 5, name: 'Middle East Trip' }, createdAt: '2024-08-23T10:00:00.000Z' },
  { id: 15, userId: 4, tripId: 4, User: { id: 4, username: 'Reem' }, Trip: { id: 4, name: 'Great Moments in Madrid' }, createdAt: '2024-08-23T10:00:00.000Z' },
  { id: 16, userId: 5, tripId: 1, User: { id: 5, username: 'Jana' }, Trip: { id: 1, name: '3 Days in Maldiv' }, createdAt: '2024-08-23T10:00:00.000Z' },
  { id: 17, userId: 6, tripId: 3, User: { id: 6, username: 'Hamza' }, Trip: { id: 3, name: 'Paris Life' }, createdAt: '2024-08-23T10:00:00.000Z' },
  { id: 18, userId: 7, tripId: 6, User: { id: 7, username: 'Mohanad' }, Trip: { id: 6, name: 'Barcelona Beach' }, createdAt: `${today}T14:00:00.000Z` },
];

export const transactions: Transaction[] = [
  { id: 65, type: 'Credit', status: 'Success', amount: 500, userId: 2, adminId: 3, wallet: { User: { username: 'Mona' } }, Admin: { username: 'Kamel' }, createdAt: '2024-08-18T10:00:00.000Z' },
  { id: 66, type: 'Credit', status: 'Failed', amount: 300, userId: 6, adminId: 2, wallet: { User: { username: 'Hamza' } }, Admin: { username: 'Moamen' }, createdAt: '2024-08-18T10:00:00.000Z' },
  { id: 67, type: 'Credit', status: 'Success', amount: 800, userId: 3, adminId: 3, wallet: { User: { username: 'Loujain' } }, Admin: { username: 'Kamel' }, createdAt: '2024-08-18T10:00:00.000Z' },
  { id: 68, type: 'Credit', status: 'pending', amount: 1500, userId: 2, wallet: { User: { username: 'Mona' } }, createdAt: '2024-08-18T10:00:00.000Z' },
  { id: 69, type: 'Credit', status: 'pending', amount: 2000, userId: 7, wallet: { User: { username: 'Mohanad' } }, createdAt: '2024-08-19T10:00:00.000Z' },
  { id: 70, type: 'Credit', status: 'pending', amount: 3500, userId: 8, wallet: { User: { username: 'Ramy' } }, createdAt: '2024-08-18T10:00:00.000Z' },
];

export const chargeRequests: ChargeRequest[] = [
  { id: 1, userId: 2, amount: 1500, bank_ticket: PLACEHOLDER_IMAGE(101), status: 'pending', User: { id: 2, username: 'Mona' }, createdAt: '2024-08-18T10:00:00.000Z' },
  { id: 2, userId: 7, amount: 2000, bank_ticket: PLACEHOLDER_IMAGE(102), status: 'pending', User: { id: 7, username: 'Mohanad' }, createdAt: '2024-08-19T10:00:00.000Z' },
  { id: 3, userId: 8, amount: 3500, bank_ticket: PLACEHOLDER_IMAGE(103), status: 'pending', User: { id: 8, username: 'Ramy' }, createdAt: '2024-08-18T10:00:00.000Z' },
  { id: 4, userId: 9, amount: 1500, bank_ticket: PLACEHOLDER_IMAGE(104), status: 'pending', User: { id: 9, username: 'Dyaa' }, createdAt: '2024-08-18T10:00:00.000Z' },
];

export const deleteProfileRequests: DeleteProfileRequest[] = [
  { id: 23, userId: 1, User: { id: 1, username: 'Sameer', wallet: { balance: 1900 } }, createdAt: '2024-08-18T10:00:00.000Z' },
  { id: 24, userId: 5, User: { id: 5, username: 'Jana', wallet: { balance: 0 } }, createdAt: '2024-08-16T10:00:00.000Z' },
  { id: 25, userId: 4, User: { id: 4, username: 'Reem', wallet: { balance: 0 } }, createdAt: '2024-08-16T10:00:00.000Z' },
];

export const featuresIncluded: FeatureIncluded[] = [
  { id: 1, name: 'Breakfast' },
  { id: 2, name: 'Airport Transfer' },
  { id: 3, name: 'Tour Guide' },
  { id: 4, name: 'Hotel Stay' },
  { id: 5, name: 'Travel Insurance' },
];

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

// Runtime state for password reset flow
export let resetEmail = '';
export let verificationCode = '123456';
