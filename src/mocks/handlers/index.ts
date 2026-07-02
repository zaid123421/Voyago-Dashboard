import { http, HttpResponse, delay } from 'msw';
import { db } from '../db';
import { generateId, isToday } from '@/shared/utils';
import { uploadImg } from '@/shared/assets/images';
import type { LoginResponse } from '@/shared/types';

const API = '/web';

function createTokens(email: string) {
  const accessToken = `access_${encodeURIComponent(email)}_${Date.now()}`;
  const refreshToken = `refresh_${encodeURIComponent(email)}_${Date.now()}`;
  db.refreshTokens.set(refreshToken, email);
  return { accessToken, refreshToken };
}

function getAuthEmail(request: Request): string | null {
  const auth = request.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const token = auth.slice(7);
  if (!token.startsWith('access_')) return null;
  const parts = token.split('_');
  if (parts.length < 3) return null;
  try {
    return decodeURIComponent(parts[1]);
  } catch {
    return null;
  }
}

function unauthorized() {
  return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

export const authHandlers = [
  http.post(`${API}/login`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as { email: string; password: string };
    const user = db.authUsers.find(
      (u) => u.email === body.email && u.password === body.password,
    );
    if (!user) {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    const tokens = createTokens(user.email);
    const response: LoginResponse = {
      ...tokens,
      name: user.name,
      role: user.role,
    };
    return HttpResponse.json(response);
  }),

  http.post(`${API}/token`, async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as { refresh_token: string };
    const email = db.refreshTokens.get(body.refresh_token);
    if (!email) return unauthorized();
    const user = db.authUsers.find((u) => u.email === email);
    if (!user) return unauthorized();
    const tokens = createTokens(user.email);
    return HttpResponse.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      name: user.name,
      role: user.role,
    });
  }),

  http.delete(`${API}/logout`, async ({ request }) => {
    await delay(200);
    const body = (await request.json()) as { refresh_token?: string };
    if (body?.refresh_token) db.refreshTokens.delete(body.refresh_token);
    return HttpResponse.json({ message: 'Logged out' }, { status: 200 });
  }),

  http.post(`${API}/forget_password`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as { email: string };
    const exists =
      db.authUsers.some((u) => u.email === body.email) ||
      db.users.some((u) => u.email === body.email);
    if (!exists) {
      return HttpResponse.json({ message: 'Email not found' }, { status: 500 });
    }
    db.resetEmail = body.email;
    db.verificationCode = '123456';
    return HttpResponse.json({ message: 'Code sent' }, { status: 200 });
  }),

  http.post(`${API}/check_verification_code`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as { email: string; cod: number };
    if (
      body.email === db.resetEmail &&
      String(body.cod) === db.verificationCode
    ) {
      return HttpResponse.json({ message: 'Verified' }, { status: 200 });
    }
    if (body.cod === 123456) {
      return HttpResponse.json({ message: 'Verified' }, { status: 200 });
    }
    return HttpResponse.json({ message: 'Invalid code' }, { status: 406 });
  }),

  http.post(`${API}/reset_password`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as {
      email: string;
      password: string;
      cod: number;
    };
    if (String(body.cod) !== db.verificationCode && body.cod !== 123456) {
      return HttpResponse.json({ message: 'Invalid code' }, { status: 406 });
    }
    const authUser = db.authUsers.find((u) => u.email === body.email);
    if (authUser) authUser.password = body.password;
    return HttpResponse.json({ message: 'Password reset' }, { status: 200 });
  }),
];

export const adminHandlers = [
  http.get(`${API}/admins`, async () => {
    await delay(300);
    return HttpResponse.json({ admins: db.admins });
  }),

  http.get(`${API}/admins/:id`, async ({ params }) => {
    await delay(300);
    const admin = db.admins.find((a) => a.id === Number(params.id));
    if (!admin) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    const { password: _, ...safe } = admin;
    return HttpResponse.json({ data: { admin: safe } });
  }),

  http.post(`${API}/add_admin`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as {
      username: string;
      email: string;
      password: string;
      role: string;
    };
    const admin = {
      id: generateId(db.admins),
      username: body.username,
      email: body.email,
      role: body.role as typeof db.admins[0]['role'],
      createdAt: new Date().toISOString(),
    };
    db.admins.push(admin);
    return HttpResponse.json({ data: admin }, { status: 201 });
  }),

  http.delete(`${API}/delete_admin/:id`, async ({ params }) => {
    await delay(300);
    const id = Number(params.id);
    const index = db.admins.findIndex((a) => a.id === id);
    if (index === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    db.admins.splice(index, 1);
    return HttpResponse.json({ message: 'Deleted' }, { status: 200 });
  }),
];

export const userHandlers = [
  http.get(`${API}/users`, async () => {
    await delay(300);
    return HttpResponse.json({ users: db.users });
  }),

  http.get(`${API}/users/:id`, async ({ params }) => {
    await delay(300);
    const user = db.users.find((u) => u.id === Number(params.id));
    if (!user) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    const userReservations = db.reservations.filter((r) => r.userId === user.id);
    return HttpResponse.json({
      data: {
        user: { ...user, password: undefined },
        reservations: userReservations,
      },
    });
  }),

  http.post(`${API}/add_user`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as {
      username: string;
      email: string;
      password: string;
    };
    const user = {
      id: generateId(db.users),
      username: body.username,
      email: body.email,
      balance: 0,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    return HttpResponse.json({ data: user }, { status: 201 });
  }),

  http.delete(`${API}/delete_user/:id`, async ({ params }) => {
    await delay(300);
    const id = Number(params.id);
    db.users = db.users.filter((u) => u.id !== id);
    db.reservations = db.reservations.filter((r) => r.userId !== id);
    return HttpResponse.json({ message: 'Deleted' }, { status: 200 });
  }),
];

export const tripHandlers = [
  http.get(`${API}/trip_cards`, async () => {
    await delay(300);
    const cards = db.trips.map((trip) => ({
      rate: {
        id: trip.id,
        name: trip.name,
        rate: trip.rate,
        capacity: trip.capacity,
        available_capacity: trip.available_capacity,
        avilable: trip.avilable,
        start_date: trip.start_date,
        end_date: trip.end_date,
        trip_price: trip.trip_price,
      },
      Destenation: trip.destinationName,
      duration: trip.duration,
      images: trip.images,
    }));
    return HttpResponse.json({ data: { cards } });
  }),

  http.get(`${API}/features_included`, async () => {
    await delay(200);
    return HttpResponse.json({ data: db.featuresIncluded });
  }),

  http.get(`${API}/destenations`, async () => {
    await delay(200);
    return HttpResponse.json({ data: db.destinations });
  }),

  http.get(`${API}/attractions`, async () => {
    await delay(200);
    return HttpResponse.json({ data: db.attractions });
  }),

  http.post(`${API}/add_trip`, async ({ request }) => {
    await delay(500);
    const body = (await request.json()) as Record<string, unknown>;
    const dest = db.destinations.find((d) => d.id === Number(body.destination_id));
    const trip = {
      id: generateId(db.trips),
      name: String(body.name ?? 'New Trip'),
      destinationId: Number(body.destination_id ?? 1),
      destinationName: dest?.name ?? 'Unknown',
      duration: Number(body.duration ?? 3),
      rate: Number(body.rate ?? 4.5),
      capacity: Number(body.capacity ?? 100),
      available_capacity: Number(body.capacity ?? 100),
      avilable: 1,
      start_date: String(body.start_date ?? new Date().toISOString().slice(0, 10)),
      end_date: String(body.end_date ?? new Date().toISOString().slice(0, 10)),
      trip_price: Number(body.trip_price ?? 500),
      images: [{ url: uploadImg }],
      createdAt: new Date().toISOString(),
    };
    db.trips.push(trip);
    return HttpResponse.json({ data: trip }, { status: 201 });
  }),

  http.post(`${API}/upload_trip_images`, async () => {
    await delay(300);
    return HttpResponse.json({ message: 'Uploaded' }, { status: 200 });
  }),

  http.delete(`${API}/delete_trip/:id`, async ({ params }) => {
    await delay(300);
    const id = Number(params.id);
    db.trips = db.trips.filter((t) => t.id !== id);
    db.reservations = db.reservations.filter((r) => r.tripId !== id);
    return HttpResponse.json({ message: 'Deleted' }, { status: 200 });
  }),
];

export const attractionHandlers = [
  http.post(`${API}/add_attraction`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as {
      name: string;
      destination_id: number;
      rate?: number;
    };
    const attraction = {
      id: generateId(db.attractions),
      name: body.name,
      destinationId: body.destination_id,
      rate: body.rate ?? 4.5,
      Images: [{ url: uploadImg }],
      createdAt: new Date().toISOString(),
    };
    db.attractions.push(attraction);
    return HttpResponse.json({ data: attraction }, { status: 201 });
  }),
];

export const destinationHandlers = [
  http.post(`${API}/add_destenation`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as { name: string; rate?: number };
    const destination = {
      id: generateId(db.destinations),
      name: body.name,
      rate: body.rate ?? 4.5,
      Images: [{ url: uploadImg }],
      createdAt: new Date().toISOString(),
    };
    db.destinations.push(destination);
    return HttpResponse.json({ data: destination }, { status: 201 });
  }),
];

export const reservationHandlers = [
  http.get(`${API}/show_all_reservations`, async ({ request }) => {
    await delay(300);
    if (!getAuthEmail(request)) return unauthorized();
    return HttpResponse.json({ data: db.reservations });
  }),

  http.delete(`${API}/delete_reservation_by_id/:id`, async ({ request, params }) => {
    await delay(300);
    if (!getAuthEmail(request)) return unauthorized();
    const id = Number(params.id);
    const reservation = db.reservations.find((r) => r.id === id);
    if (reservation) {
      const trip = db.trips.find((t) => t.id === reservation.tripId);
      if (trip) trip.available_capacity += 1;
    }
    db.reservations = db.reservations.filter((r) => r.id !== id);
    return HttpResponse.json({ message: 'Deleted' }, { status: 200 });
  }),
];

export const transactionHandlers = [
  http.get(`${API}/show_all_transactions`, async ({ request }) => {
    await delay(300);
    if (!getAuthEmail(request)) return unauthorized();
    return HttpResponse.json({ data: db.transactions });
  }),

  http.get(`${API}/charge_requests`, async ({ request }) => {
    await delay(300);
    if (!getAuthEmail(request)) return unauthorized();
    const pending = db.chargeRequests.filter((c) => c.status === 'pending');
    return HttpResponse.json({ data: pending });
  }),

  http.get(`${API}/approve_charge/:id`, async ({ request, params }) => {
    await delay(400);
    if (!getAuthEmail(request)) return unauthorized();
    const id = Number(params.id);
    const charge = db.chargeRequests.find((c) => c.id === id);
    if (!charge) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    charge.status = 'approved';
    const user = db.users.find((u) => u.id === charge.userId);
    if (user) user.balance += charge.amount;
    db.transactions.push({
      id: generateId(db.transactions),
      type: 'Credit',
      status: 'Success',
      amount: charge.amount,
      userId: charge.userId,
      adminId: 3,
      wallet: { User: { username: charge.User.username } },
      Admin: { username: 'Kamel' },
      createdAt: new Date().toISOString(),
    });
    db.chargeRequests = db.chargeRequests.filter((c) => c.id !== id);
    return HttpResponse.json({ message: 'Approved' }, { status: 200 });
  }),

  http.get(`${API}/reject_charge/:id`, async ({ request, params }) => {
    await delay(400);
    if (!getAuthEmail(request)) return unauthorized();
    const id = Number(params.id);
    db.chargeRequests = db.chargeRequests.filter((c) => c.id !== id);
    return HttpResponse.json({ message: 'Rejected' }, { status: 200 });
  }),
];

export const requestHandlers = [
  http.get(`${API}/delete_profile_requests`, async ({ request }) => {
    await delay(300);
    if (!getAuthEmail(request)) return unauthorized();
    return HttpResponse.json({ data: db.deleteProfileRequests });
  }),

  http.get(`${API}/empty_then_delete/:id`, async ({ request, params }) => {
    await delay(400);
    if (!getAuthEmail(request)) return unauthorized();
    const id = Number(params.id);
    const req = db.deleteProfileRequests.find((r) => r.id === id);
    if (!req) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    const user = db.users.find((u) => u.id === req.userId);
    if (user) user.balance = 0;
    db.users = db.users.filter((u) => u.id !== req.userId);
    db.deleteProfileRequests = db.deleteProfileRequests.filter((r) => r.id !== id);
    return HttpResponse.json({ message: 'Deleted' }, { status: 200 });
  }),
];

export const dashboardHandlers = [
  http.get(`${API}/overview_users`, async ({ request }) => {
    await delay(300);
    if (!getAuthEmail(request)) return unauthorized();
    const todayUsers = db.users.filter((u) => isToday(u.createdAt)).length;
    const todayBookings = db.reservations.filter((r) => isToday(r.createdAt)).length;
    return HttpResponse.json({
      data: {
        total_users: db.users.length,
        total_booking: db.reservations.length,
        todayUsers,
        todayBookings,
      },
    });
  }),

  http.get(`${API}/top_trips`, async ({ request }) => {
    await delay(300);
    if (!getAuthEmail(request)) return unauthorized();
    const tripBookings = db.trips.map((trip) => ({
      name: trip.name,
      rate: trip.rate,
      bookings: db.reservations.filter((r) => r.tripId === trip.id).length,
    }));
    tripBookings.sort((a, b) => b.bookings - a.bookings);
    return HttpResponse.json({ data: { result: tripBookings.slice(0, 5) } });
  }),

  http.get(`${API}/top_destinations`, async ({ request }) => {
    await delay(300);
    if (!getAuthEmail(request)) return unauthorized();
    const destStats = db.destinations.map((dest) => ({
      name: dest.name,
      rate: dest.rate,
    }));
    destStats.sort((a, b) => b.rate - a.rate);
    return HttpResponse.json({ data: { result: destStats.slice(0, 5) } });
  }),
];

export const handlers = [
  ...authHandlers,
  ...adminHandlers,
  ...userHandlers,
  ...tripHandlers,
  ...attractionHandlers,
  ...destinationHandlers,
  ...reservationHandlers,
  ...transactionHandlers,
  ...requestHandlers,
  ...dashboardHandlers,
];
