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

## Deployment

Deployed on vercel

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

---

*Built with Next.js 16 · Tailwind CSS v4 · Recharts · Zustand*
