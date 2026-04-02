# Finance Dashboard UI — Tech Stack

> **Product:** FinTrack Finance Dashboard  
> **Version:** 1.0 | April 2025  
> **Platform:** Web (React + Vite)

---

## 1. Overview

This document defines the full technology stack for the Finance Dashboard UI. Every choice is intentional — prioritizing developer experience, bundle size, and the ability to demonstrate real frontend engineering skills within a static, no-backend setup.

---

## 2. Core Framework

| Layer | Technology | Version | Purpose |
|---|---|---|---|
pnpm
| Framework | **Nextjs** || Component model, hooks, rendering |
| Build Tool | **Vite** | Fast dev server, HMR, optimized prod build |
| Language | **TypeScript** | 5.x | Type safety across components, store, and data |

**Why Vite over CRA?**  
Vite offers near-instant cold starts and HMR, making development significantly faster. CRA is no longer actively maintained.

**Why TypeScript?**  
The transaction data model, role types, filter state, and derived values all benefit from strict typing. Catches bugs at compile time, not runtime.

---

## 3. Styling

| Layer | Technology | Purpose |
|---|---|---|
| CSS Framework | **Tailwind CSS** | Utility-first, responsive design without custom CSS files |
| Font | **Inter** (Google Fonts) | Clean, readable, modern sans-serif |
| Spacing Scale | 4px / 8px base unit | Consistent layout rhythm |
| Color Tokens | Tailwind config | Blue (primary), Green (income), Red (expense) |

**Design system approach:**  
Colors are mapped in `tailwind.config.ts` as semantic tokens (e.g. `income`, `expense`, `primary`) rather than raw Tailwind color names. This keeps components readable and consistent.

---

## 4. State Management

| Concern | Solution | Scope |
|---|---|---|
| Transactions data | **Zustand** store | Global |
| Role (Viewer/Admin) | **Zustand** store | Global |
| Filter state | `useState` / local | Page (Transactions) |
| UI toggles | `useState` | Component |
| Derived values | `useMemo` | Component / hook |

**Why Zustand?**  
Zustand is lightweight (~1KB), requires no providers, has excellent TypeScript support, and avoids Redux boilerplate. It's the right tool for managing 2–3 global domains (transactions + role) without over-engineering.

**Rules enforced:**
- No derived state in the store (totals, filtered lists, chart data all computed via `useMemo`)
- All transaction mutations (add, edit, delete) go through a single store action
- Role is globally accessible from any component without prop drilling

---

## 5. Data Visualization

| Chart Type | Library | Component |
|---|---|---|
| Area / Line Chart | **Recharts** | Balance Trend over time |
| Bar Chart | **Recharts** | Income vs Expense by month |
| Donut Chart | **Recharts** | Spending by category |

**Why Recharts?**  
Recharts is React-native (renders SVG via React components), has first-class TypeScript support, is fully responsive via `ResponsiveContainer`, and integrates cleanly with Tailwind-styled tooltips and legends.

**Chart UX guidelines:**
- Tooltips on hover for all charts
- Empty state fallback when data is absent
- Time toggle (1M / 3M / 6M / All) re-renders trend chart without full remount
- Legend sorted by value descending for donut chart

---

## 6. Date Handling

| Library | Version | Usage |
|---|---|---|
| **date-fns** | 3.x | Formatting, parsing, range filtering, MoM comparisons |

**Why date-fns over moment/dayjs?**  
date-fns is tree-shakeable (only imports what you use), immutable by design, and has first-class TypeScript types. No global side effects.

Common usages in this project:
- `format(date, 'MMM dd, yyyy')` — display in transaction rows
- `startOfMonth` / `endOfMonth` — MoM insight comparison
- `isAfter` / `isBefore` — date range filtering
- `subMonths` — time toggle filtering (1M, 3M, 6M)

---

## 7. Icons

| Library | Version | Usage |
|---|---|---|
| **Lucide React** | Latest | All UI icons (nav, actions, badges, states) |

**Why Lucide?**  
Consistent stroke-based icon set, tree-shakeable, renders as inline SVG, works perfectly with Tailwind sizing classes (`w-4 h-4`).

---

## 8. Mock Data

| Concern | Approach |
|---|---|
| Data location | `src/data/transactions.ts` |
| Format | Static TypeScript array, typed with `Transaction` interface |
| Volume | 40–60 transactions spanning 3+ months |
| Coverage | 6+ categories, income + expense, one empty month, one single-entry category |
| No API calls | All data loaded synchronously at app startup |

**Why static data?**  
The assessment focuses on UI, component architecture, and state management — not async data fetching. Static data also ensures consistent, reproducible behavior across all evaluators.

Optional enhancement: wrap data loading in a mock async function (setTimeout) to simulate real API latency and demonstrate loading state handling.

---

## 9. Project Structure

```
src/
├── components/          # Shared/reusable UI components
│   ├── ui/              # Primitives: Button, Badge, Card, Modal, Input
│   └── charts/          # Recharts wrappers: TrendChart, DonutChart, BarChart
│
├── features/            # Feature-scoped modules
│   ├── dashboard/       # KPI cards, chart section, layout
│   ├── transactions/    # List, filters, add/edit form
│   └── insights/        # Insights panel and derived cards
│
├── hooks/               # Custom hooks
│   ├── useFilteredTransactions.ts
│   ├── useKPIs.ts
│   └── useInsights.ts
│
├── store/               # Zustand stores
│   ├── transactionStore.ts
│   └── roleStore.ts
│
├── data/                # Static mock data
│   └── transactions.ts
│
├── utils/               # Pure utility functions
│   ├── currency.ts      # formatCurrency(), formatPercent()
│   ├── date.ts          # Wrappers around date-fns
│   └── categories.ts    # Category list, color map
│
├── types/               # Shared TypeScript interfaces and enums
│   ├── transaction.ts
│   └── role.ts
│
├── App.tsx              # Root: routing + layout shell
└── main.tsx             # Vite entry point
```

---

## 10. TypeScript Interfaces

```ts
// types/transaction.ts
export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Food & Dining'
  | 'Transport'
  | 'Shopping'
  | 'Entertainment'
  | 'Healthcare'
  | 'Utilities'
  | 'Salary'
  | 'Freelance'
  | 'Investment';

export interface Transaction {
  id: string;                  // UUID
  date: string;                // ISO 8601 — 'YYYY-MM-DD'
  amount: number;              // Always positive
  type: TransactionType;
  category: Category;
  description: string;         // Max 80 chars
  merchant?: string;           // Optional
}

// types/role.ts
export type Role = 'viewer' | 'admin';
```

---

## 11. Responsive Design

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 768px | Single column, bottom tab navigation |
| Tablet | 768px – 1024px | 2-column grid, sidebar hidden |
| Desktop | > 1024px | Full layout with persistent sidebar |

Implemented using Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) — no custom media query CSS.

---

## 12. Optional Enhancements Stack

| Enhancement | Implementation |
|---|---|
| Dark Mode | Tailwind `darkMode: 'class'` + toggle in header, CSS variables for chart colors |
| Local Storage | Zustand `persist` middleware — auto-syncs store to `localStorage` |
| Export (CSV) | `Papa.parse` (PapaParse) or native JS Blob API — no additional dependency needed for simple CSV |
| Animations | Tailwind transition utilities + `framer-motion` for form/modal entrance animations |
| Mock API delay | Wrap static data load in `Promise` with `setTimeout` to simulate async fetch + loading states |

---

## 13. Dev Dependencies & Tooling

| Tool | Purpose |
|---|---|
| **ESLint** | Code quality, enforces rules for React hooks, TypeScript |
| **Prettier** | Consistent code formatting |
| **Vite** | Dev server + production bundler |
| **@types/react** | TypeScript definitions for React |
| **typescript** | TypeScript compiler |

---

## 14. Package Summary

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "zustand": "^4.x",
    "recharts": "^2.x",
    "date-fns": "^3.x",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x",
    "eslint": "^8.x",
    "prettier": "^3.x"
  }
}
```

---

## 15. Key Design Decisions

| Decision | Rationale |
|---|---|
| Zustand over Redux | Less boilerplate, no providers, perfect for 2–3 global domains |
| Recharts over Chart.js | React-native API, SVG-based, TypeScript-friendly |
| date-fns over moment | Tree-shakeable, immutable, modern |
| Tailwind over CSS Modules | Faster to build, enforces design system, great responsive utilities |
| Vite over CRA | Faster builds, HMR, actively maintained |
| Static mock data | Keeps scope focused on UI/state, not async logic (unless opting into mock API) |
| No derived state in store | Keeps store minimal and predictable; derived values computed fresh via useMemo |