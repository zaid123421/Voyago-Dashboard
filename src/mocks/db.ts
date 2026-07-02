import * as seed from './seed';

export interface MockDb {
  authUsers: typeof seed.authUsers;
  admins: typeof seed.admins;
  users: typeof seed.users;
  destinations: typeof seed.destinations;
  attractions: typeof seed.attractions;
  trips: typeof seed.trips;
  reservations: typeof seed.reservations;
  transactions: typeof seed.transactions;
  chargeRequests: typeof seed.chargeRequests;
  deleteProfileRequests: typeof seed.deleteProfileRequests;
  featuresIncluded: typeof seed.featuresIncluded;
  visitorStats: typeof seed.visitorStats;
  resetEmail: string;
  verificationCode: string;
  refreshTokens: Map<string, string>;
}

function cloneDb(): MockDb {
  return {
    authUsers: [...seed.authUsers],
    admins: JSON.parse(JSON.stringify(seed.admins)),
    users: JSON.parse(JSON.stringify(seed.users)),
    destinations: JSON.parse(JSON.stringify(seed.destinations)),
    attractions: JSON.parse(JSON.stringify(seed.attractions)),
    trips: JSON.parse(JSON.stringify(seed.trips)),
    reservations: JSON.parse(JSON.stringify(seed.reservations)),
    transactions: JSON.parse(JSON.stringify(seed.transactions)),
    chargeRequests: JSON.parse(JSON.stringify(seed.chargeRequests)),
    deleteProfileRequests: JSON.parse(JSON.stringify(seed.deleteProfileRequests)),
    featuresIncluded: [...seed.featuresIncluded],
    visitorStats: [...seed.visitorStats],
    resetEmail: '',
    verificationCode: '123456',
    refreshTokens: new Map(),
  };
}

export const db: MockDb = cloneDb();

export function resetDb(): void {
  const fresh = cloneDb();
  Object.assign(db, fresh);
  db.refreshTokens = fresh.refreshTokens;
}
