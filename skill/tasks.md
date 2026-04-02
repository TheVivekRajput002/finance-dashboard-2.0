# Finance Dashboard — Next.js Conversion Plan

## Overview

Convert three static HTML prototypes (`overview.html`, `transaction.html`, `insights.html`) for the **Clerio** finance dashboard into a fully working **Next.js 16 + TypeScript + Tailwind CSS v4** app with proper component architecture, Zustand state management, and all PRD features implemented.

The design language is already defined: **glassmorphism**, Manrope/Inter fonts, a Material Design 3-inspired color palette, and responsive sidebar/bottom-nav layout.

---

## User Review Required

> [!IMPORTANT]
> The PRD mentions **Zustand** for state management. We'll add it as a new dependency. This is the only new package required alongside what's already in `package.json`.

> [!IMPORTANT]
> The PRD says charts should use **Recharts** (line/area + donut). The HTML prototype uses CSS-only mock bars/donuts. We'll replace those with real Recharts components for full interactivity. This requires adding `recharts` as a dependency.

> [!NOTE]
> The PRD also mentions `date-fns` for date utilities. We'll add it for MoM comparison and date formatting in insights.

> [!NOTE]
> The existing Next.js project already has Tailwind CSS v4 set up. We'll preserve the v4 approach (CSS-first config via `globals.css`, not `tailwind.config.ts`) but add all the custom color tokens from the HTML prototype as CSS variables.

---

## Proposed Changes

### Foundation Layer

#### [MODIFY] [globals.css](file:///c:/Users/ASUS/Documents/VS%20code%20Files/WEB%20DEV/NEXTJS/Zorvyn%20finance%20dashboard%202.0/my-app/app/globals.css)
- Add all custom color tokens from the HTML prototypes as CSS variables
- Add `glass-card`, `glass-cylinder`, `sidebar-blur`, `cylinder-gradient`, `green-cylinder` utility classes
- Import Manrope + Inter fonts via `@import`
- Set body background gradient

#### [MODIFY] [layout.tsx](file:///c:/Users/ASUS/Documents/VS%20code%20Files/WEB%20DEV/NEXTJS/Zorvyn%20finance%20dashboard%202.0/my-app/app/layout.tsx)
- Update metadata (title: "Clerio — Wealth Management")
- Load Manrope + Inter via `next/font/google`
- Apply font variables to `<html>`

#### [NEW] `app/data/transactions.ts`
- 50 mock transactions over 4+ months
- Fields: id, date, amount, type, category, description, merchant
- Covers: income + expense, 8+ categories, one sparse month

#### [NEW] `app/store/useFinanceStore.ts`
- Zustand store with:
  - `transactions[]` — source of truth
  - `role: 'admin' | 'viewer'` — toggleable
  - `addTransaction()`, `editTransaction()`, `deleteTransaction()`
  - Persisted to `localStorage`

#### [NEW] `app/types/index.ts`
- TypeScript interfaces: `Transaction`, `Category`, `Role`

---

### Shared Components

#### [NEW] `app/components/layout/Sidebar.tsx`
- Desktop sidebar (hidden on mobile)
- Clerio logo + "Wealth Management" label
- Navigation links: Overview, Transactions, Insights
- Bottom links: Settings, Support
- Active link highlighted with blue pill

#### [NEW] `app/components/layout/MobileNav.tsx`
- Fixed bottom nav for mobile
- Icons + labels for all 3 routes
- FAB-style center "+" button (visible on transactions page)

#### [NEW] `app/components/layout/TopBar.tsx`
- Fixed top bar (offset for sidebar on desktop)
- Role toggle (Admin/Viewer pill)
- Notifications icon
- User avatar

#### [NEW] `app/components/layout/DashboardLayout.tsx`
- Wraps all page content with Sidebar + MobileNav + TopBar
- Handles `md:ml-72` offset for main content

#### [NEW] `app/components/ui/KpiCard.tsx`
- Props: title, value, icon, trend, trendLabel, accentColor
- Glass card style, hover shadow

#### [NEW] `app/components/ui/CategoryBadge.tsx`
- Pill badge with category-specific color mapping

#### [NEW] `app/components/ui/RoleToggle.tsx`
- Admin / Viewer toggle connected to Zustand store

#### [NEW] `app/components/ui/TransactionModal.tsx`
- Add/Edit form modal (Admin only)
- Fields: amount, type, category, date, description, merchant
- Validation: no future dates, max 80 chars description
- Inline error states

---

### Page: Overview (`/`)

#### [MODIFY] `app/page.tsx` → Overview page
- KPI cards grid (Total Balance, Income, Expenses, Savings Rate) — computed with `useMemo`
- Balance Evolution chart (Recharts `AreaChart`) with 1M/3M/6M/All time toggle
- Spending Breakdown (Recharts `PieChart` / `RadialBarChart` styled as donut)
- Recent Transactions mini-list (last 3, links to full page)
- AI Intelligence card (static advisory, from HTML prototype)

---

### Page: Transactions (`/transactions`)

#### [NEW] `app/transactions/page.tsx`
- Full transaction list with table layout
- Search (debounced 300ms), type filter, category multi-select, date range, sort
- Pagination (10/20 rows per page, client-side)
- Admin: edit/delete per row, FAB "Add Transaction" → opens modal
- Viewer: actions hidden
- Empty state when no results

---

### Page: Insights (`/insights`)

#### [NEW] `app/insights/page.tsx`
- Hero section with title + subtitle
- Monthly Intelligence bento grid with Recharts bar chart (weekly spend)
- Strategic Advisory card (blue, call-to-action)
- Top Category card (derived from transactions)
- MoM Delta card (month-over-month comparison using date-fns)
- Biggest Single Expense card
- Saving Streak card (circular progress)
- Daily Spend Velocity mini bar chart (last 7 days)

---

## New Dependencies to Install

```
pnpm add zustand recharts date-fns
pnpm add -D @types/recharts
```

---

## File Structure After Conversion

```
app/
  components/
    layout/
      Sidebar.tsx
      MobileNav.tsx
      TopBar.tsx
      DashboardLayout.tsx
    ui/
      KpiCard.tsx
      CategoryBadge.tsx
      RoleToggle.tsx
      TransactionModal.tsx
      DonutChart.tsx
      BalanceChart.tsx
  data/
    transactions.ts
  store/
    useFinanceStore.ts
  types/
    index.ts
  insights/
    page.tsx
  transactions/
    page.tsx
  globals.css
  layout.tsx
  page.tsx
```

---

## Open Questions

> [!IMPORTANT]
> Should the "AI Intelligence" card on the Overview page remain as static copy (as in the HTML prototype), or do you want it replaced with real computed insights from the transaction data?

> [!NOTE]
> The HTML prototype shows a user avatar that loads from an external Google URL. Should I use a local placeholder image/SVG avatar instead?

---

## Verification Plan

### Automated
- Run `pnpm dev` and confirm no TypeScript/build errors
- Navigate all 3 routes and verify rendering

### Manual Verification
- KPI cards update correctly based on mock data
- Transactions filter/search/sort/paginate correctly
- Role toggle hides/shows Admin actions
- Add/edit/delete transaction works (Admin only)
- Charts render with real data
- Responsive layout: sidebar on desktop, bottom nav on mobile


# Finance Dashboard — Task List

## Task 1 — Foundation Setup
- `[x]` Install dependencies: `zustand`, `recharts`, `date-fns`, `lucide-react`
- `[x]` Create `app/types/index.ts` — TypeScript interfaces
- `[x]` Create `app/data/transactions.ts` — 50 mock transactions
- `[x]` Create `app/store/useFinanceStore.ts` — Zustand store (transactions + role)
- `[x]` Update `app/globals.css` — custom color tokens, glass-card utilities, body gradient
- `[x]` Update `app/layout.tsx` — Manrope + Inter fonts, metadata

## Task 2 — Layout Components
- `[ ]` Create `app/components/layout/Sidebar.tsx`
- `[ ]` Create `app/components/layout/MobileNav.tsx`
- `[ ]` Create `app/components/layout/TopBar.tsx`
- `[ ]` Create `app/components/layout/DashboardLayout.tsx`

## Task 3 — Shared UI Components
- `[ ]` Create `app/components/ui/KpiCard.tsx`
- `[ ]` Create `app/components/ui/CategoryBadge.tsx`
- `[ ]` Create `app/components/ui/RoleToggle.tsx`
- `[ ]` Create `app/components/ui/TransactionModal.tsx`

## Task 4 — Overview Page (`/`)
- `[ ]` KPI cards grid (Balance, Income, Expenses, Savings Rate)
- `[ ]` Balance Evolution chart (Recharts AreaChart) + time toggle
- `[ ]` Spending Breakdown donut chart (Recharts PieChart)
- `[ ]` Recent Transactions mini-list
- `[ ]` AI Intelligence / Insights card

## Task 5 — Transactions Page (`/transactions`)
- `[ ]` Transaction table with all columns
- `[ ]` Search (debounced), type filter, category filter, date range, sort
- `[ ]` Pagination (10/20 rows)
- `[ ]` Admin: Edit/Delete per row + FAB Add button → modal
- `[ ]` Viewer: actions hidden
- `[ ]` Empty state

## Task 6 — Insights Page (`/insights`)
- `[ ]` Hero section
- `[ ]` Monthly Intelligence bento + Recharts bar chart
- `[ ]` Strategic Advisory card
- `[ ]` Top Category / MoM Delta / Biggest Expense cards (computed from data)
- `[ ]` Saving Streak ring
- `[ ]` Daily Spend Velocity mini-chart
