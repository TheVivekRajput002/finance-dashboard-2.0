# Clerio — Personal Finance Dashboard

> A premium, glassmorphism-styled wealth management dashboard. Track transactions, visualise spending patterns, and surface monthly intelligence — all in your browser with zero backend required.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![Recharts](https://img.shields.io/badge/Recharts-3.x-8884d8)
![Zustand](https://img.shields.io/badge/Zustand-5.x-orange)

---

## Features

- **Overview Dashboard** — KPI cards (Balance, Income, Expenses, Savings Rate), interactive balance evolution area chart with 1M / 3M / 6M / All time toggle, spending breakdown donut chart, and a recent-transactions mini-list
- **Transactions Page** — Full sortable table with debounced search, type/category/date-range filters, client-side pagination (10 / 20 / 50 rows), and role-gated CRUD (add, edit, delete)
- **Insights Page** — Weekly spend bar chart, Strategic Advisory card, Top Category, Month-over-Month delta, Biggest Single Expense, Saving Streak ring, and Daily Spend Velocity mini-chart — all computed from real data
- **Role-Based Access** — Seamless Admin / Viewer toggle persisted in localStorage; Admin unlocks all CRUD actions
- **Glassmorphism UI** — Material Design 3 color tokens, Manrope + Inter fonts, frosted-glass cards, responsive sidebar (desktop) / bottom-nav (mobile) layout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-first config via `globals.css`) |
| State | Zustand 5 with `persist` middleware → localStorage |
| Charts | Recharts 3 (AreaChart, BarChart, PieChart) |
| Date utils | date-fns 4 |
| Icons | Lucide React |
| Fonts | Manrope + Inter via `next/font/google` |
| Hosting | Vercel (recommended) |

> **No backend. No database. No auth service.** All data lives in Zustand + `localStorage`.

---

## Quick Start

### Prerequisites

- **Node.js** ≥ 18.17 (Next.js 16 requirement)
- **pnpm** ≥ 9 (recommended) — or npm / yarn

```bash
# Check versions
node -v   # should be ≥ 18.17
pnpm -v   # should be ≥ 9
```

### Install

```bash
# 1. Clone the repo
git clone https://github.com/TheVivekRajput002/finance-dashboard-2.0.git
cd finance-dashboard-2.0/my-app

# 2. Install dependencies
pnpm install
```

### Environment Setup

This project has **no required environment variables** — it runs entirely client-side with mock data seeded on first load.

If you ever wire up a real API, create a `.env.local` at the project root:

```bash
cp .env.example .env.local   # (if provided)
```

See [Environment Variables](#environment-variables) for the full table.

### Run Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with Turbopack hot-reload |
| `pnpm build` | Build production bundle |
| `pnpm start` | Serve production build locally |
| `pnpm lint` | Run ESLint across the codebase |

---

## Repository Structure

```
my-app/
├── app/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── BalanceChart.tsx       # Recharts AreaChart — balance evolution
│   │   │   └── SpendingDonut.tsx      # Recharts PieChart — category donut
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx    # Root wrapper: Sidebar + TopBar + MobileNav
│   │   │   ├── MobileNav.tsx          # Fixed bottom nav + FAB (mobile only)
│   │   │   ├── Sidebar.tsx            # Fixed sidebar with active link (desktop only)
│   │   │   └── TopBar.tsx             # Fixed top bar: role toggle, notifications, avatar
│   │   └── ui/
│   │       ├── CategoryBadge.tsx      # Color-coded category pill
│   │       ├── KpiCard.tsx            # Reusable stat card
│   │       ├── RoleToggle.tsx         # Admin / Viewer switcher
│   │       └── TransactionModal.tsx   # Add / Edit modal with validation
│   ├── data/
│   │   └── transactions.ts            # 50 mock transactions (Jan–May 2025)
│   ├── insights/
│   │   └── page.tsx                   # /insights — analytics & intelligence
│   ├── store/
│   │   └── useFinanceStore.ts         # Zustand store (transactions, role, CRUD)
│   ├── transactions/
│   │   └── page.tsx                   # /transactions — table + filters + CRUD
│   ├── types/
│   │   └── index.ts                   # Transaction, Category, Role, KpiData types
│   ├── globals.css                    # Design tokens (@theme), glass utilities, body gradient
│   ├── layout.tsx                     # Root layout: font injection + metadata
│   └── page.tsx                       # / — Overview dashboard
├── public/                            # Static assets
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Architecture Overview

```
Browser (Client-only)
    │
    ├── Next.js App Router
    │     ├── /               → Overview (KPIs, Charts, Recent Txns)
    │     ├── /transactions   → Full CRUD table
    │     └── /insights       → Analytics & Intelligence
    │
    ├── Zustand Store (useFinanceStore)
    │     ├── transactions[]  ← seeded from mock data on first load
    │     ├── role            ← 'admin' | 'viewer' (persisted)
    │     └── CRUD actions    → addTransaction / editTransaction / deleteTransaction
    │
    └── localStorage          ← Zustand persist layer (key: "clerio-finance-store")
```

**Data flow:** All pages subscribe to the Zustand store. Admin CRUD actions mutate the store, which is instantly reflected across all pages and persisted to `localStorage` so data survives page refreshes.

---

## API Endpoints

This is a **fully client-side app** — there are no HTTP API endpoints. All data operations go through the Zustand store:

| Action | Store Method | Trigger |
|---|---|---|
| Load transactions | Hydrated from `localStorage` on mount | App load |
| Add transaction | `addTransaction(tx)` | Admin submits modal |
| Edit transaction | `editTransaction(id, updates)` | Admin edits row |
| Delete transaction | `deleteTransaction(id)` | Admin confirms delete |
| Switch role | `setRole('admin' \| 'viewer')` | RoleToggle click |

> If you extend Clerio with a real backend, the recommended pattern is to wrap these store methods with `fetch` calls and keep the UI layer unchanged.

---

## Environment Variables

No environment variables are required to run this project. The table below documents keys you would add if extending with external services:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | No | Public base URL (e.g. `https://clerio.vercel.app`) |
| `NEXT_PUBLIC_API_URL` | No | Backend API base URL if wiring a real server |
| `DATABASE_URL` | No | Connection string if adding a database layer |

Add variables to `.env.local` (never commit this file — it's in `.gitignore`):

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Testing

No automated test suite is included in the current version. The recommended setup for future tests:

```bash
# Install Vitest + React Testing Library
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Run tests
pnpm test
```

**Manual verification checklist:**
- [ ] All 3 routes render without console errors
- [ ] KPI cards show correct totals from mock data
- [ ] Transaction filters + search return correct results
- [ ] Role toggle hides/shows Admin actions correctly
- [ ] Add / Edit / Delete transaction persists across page refresh
- [ ] Charts render with data on all breakpoints
- [ ] Sidebar visible on desktop; bottom nav visible on mobile

---

## Deployment

The easiest way to deploy is **Vercel** — zero config required for Next.js.

| Platform | Steps |
|---|---|
| **Vercel** | Push to GitHub → Import repo at [vercel.com/new](https://vercel.com/new) → Deploy (auto-detects Next.js) |
| **Netlify** | `pnpm build` → deploy the `.next/` output with `@netlify/plugin-nextjs` |
| **Self-hosted** | `pnpm build && pnpm start` on any Node.js 18+ server |

```bash
# Production build
pnpm build

# Serve locally (production mode)
pnpm start
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit with a clear message: `git commit -m "feat: add budget goal tracker"`
4. Push and open a Pull Request against `main`

**Branch naming:**
- `feat/*` — new features
- `fix/*` — bug fixes
- `chore/*` — maintenance (deps, config, docs)

---

## License

This project is open source under the **MIT License**.

---

*Built with Next.js 16 · Tailwind CSS v4 · Recharts · Zustand*
