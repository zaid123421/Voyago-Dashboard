# Voyago Dashboard

Professional admin dashboard for the **Voyago** travel platform. Built with React, TypeScript, Vite, Tailwind CSS, TanStack Query, and MSW for a fully interactive mock backend.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — fast dev server and builds
- **Tailwind CSS** — utility layer on top of Voyago design tokens
- **TanStack Query** — server state, caching, mutations
- **MSW (Mock Service Worker)** — full CRUD mock API
- **React Router v6** — protected routes
- **Chart.js** — dashboard analytics
- **React Hot Toast** — notifications

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Credentials

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| Super Admin | `admin@voyago.com` | `admin12345` | 2FA code: `123456` |
| Admin | `manager@voyago.com` | `manager123` | Direct to dashboard |

Password reset / verification code: `123456`

## Features

- **Auth** — Login, logout, token refresh, Super Admin 2FA, forgot password flow
- **Dashboard** — Live KPIs, visitor chart, top trips & destinations (computed from mock DB)
- **CRUD** — Admins, Users, Trips, Attractions, Destinations
- **Reservations** — List & delete (updates dashboard stats)
- **Transactions** — History + approve/reject charge requests (updates user balance)
- **Delete Account Requests** — Empty wallet & delete user

## Architecture

```
src/
├── api/           # Axios client + typed endpoints
├── mocks/         # MSW handlers + in-memory database
├── features/      # Domain modules (auth, users, trips, ...)
├── shared/        # Components, layouts, contexts, types
├── app/           # Router, providers
└── styles/        # Global CSS (Voyago theme)
```

All API calls go to `/web/*` and are intercepted by MSW. Mutations update the in-memory database, so changes reflect across pages instantly.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages |

## Deploy

```bash
npm run deploy
```

Build output goes to `dist/` with `base: './'` for GitHub Pages compatibility.
