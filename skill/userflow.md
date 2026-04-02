# Finance Dashboard UI - User Flow

> Product: Zorvyn / Clerio-style Finance Dashboard
> Version: UI flow derived from the current 3-page design
> Platform: Web

---

## 1. App Entry

```text
User opens app
    |
    v
Dashboard shell loads
    |
    +-- Left sidebar is visible
    +-- Top header controls are visible
    |
    v
Default landing page: Overview
Default role: Viewer
```

The app opens into a persistent dashboard shell rather than a standalone page.

---

## 2. Global Shell Flow

All three pages share the same high-level shell:

- Left sidebar with brand, primary navigation, and bottom utility links
- Top header with page-level controls
- Large rounded content canvas for the active page

### Sidebar

```text
Brand block
    |
    +-- Overview
    +-- Transactions
    +-- Insights
    |
Bottom utility area
    +-- Settings
    +-- Support
```

Behavior:

- Active page is highlighted with a soft blue pill state
- Inactive items remain minimal and low-contrast
- Settings and Support stay anchored near the bottom

### Header

Header controls vary slightly by page, but the system includes:

- Top navigation/context tabs
- Role toggle: Viewer / Admin
- Notification icon
- Profile avatar
- Search on data-heavy pages
- Primary CTA when relevant

---

## 3. Role Toggle Flow

The role toggle is always visible in the header.

```text
Viewer selected
    |
    +-- Overview is read-first
    +-- Transactions list is view-only
    +-- Insights remain visible
    +-- Admin actions are hidden or disabled

Admin selected
    |
    +-- Add Transaction CTA becomes available
    +-- Row-level edit/delete actions remain available
    +-- Management-oriented controls are emphasized
```

Role switching should update the interface immediately across all pages.

---

## 4. Overview Page Flow

The Overview page acts as the primary portfolio snapshot.

### 4.1 Page Entry

```text
User lands on Overview
    |
    v
Header/title block appears
    |
    +-- Product title
    +-- Short subtitle/context line
    +-- Status chips such as AI/live/viewer mode
    +-- Add Transaction CTA on the right
```

### 4.2 KPI Summary Row

The first major content row contains four KPI cards:

- Total Balance
- Total Income
- Total Expenses
- Savings Rate

Behavior:

- Each card shows a compact label and one dominant value
- Cards include small semantic status icons
- Positive trend/support text can appear below the main number
- Savings rate uses green emphasis

### 4.3 Main Analytics Row

```text
Overview main row
    |
    +-- Balance Evolution card
    |     +-- Monthly bar chart
    |     +-- Time range chips: 1M / 3M / 6M / All
    |
    +-- Spending Breakdown card
          +-- Donut chart
          +-- Center value
          +-- Legend with category colors
```

Behavior:

- Time chips update the trend visualization without leaving the page
- Charts are glanceable first, detailed second
- Spending breakdown legend reinforces category reading

### 4.4 Lower Utility Row

The bottom section contains:

- Recent Transactions card
- AI Intelligence card

Recent Transactions behavior:

- Shows a short preview list rather than the full table
- Includes merchant/category context and amount styling
- Offers a "View All" route to the Transactions page

AI Intelligence behavior:

- Shows a short recommendation or generated summary
- Includes action chips or a compact CTA
- May display an associated advisor/contact block

---

## 5. Transactions Page Flow

The Transactions page is the detailed management surface.

### 5.1 Page Entry

```text
User navigates to Transactions
    |
    v
Page title + supporting description shown
    |
    +-- Add Transaction button visible on the right
```

### 5.2 Filter Toolbar

The top toolbar contains a dense but clean filter row:

- Search input
- Type dropdown
- Category dropdown
- Date from field
- Date to field

Behavior:

- Search filters the visible records
- Filters are inline rather than hidden in a modal by default
- Controls sit inside a rounded toolbar card
- Toolbar should remain easy to scan despite multiple controls

### 5.3 Table Flow

```text
Transactions table loads
    |
    +-- Date column
    +-- Description column with merchant/icon
    +-- Category pill
    +-- Amount column
    +-- Actions column
```

Behavior:

- Rows use strong whitespace and soft separators
- Category is represented as a small rounded tag
- Negative amounts are red
- Positive amounts are green
- Action icons are compact and aligned to the far right

### 5.4 Row Actions

For editable rows:

- Edit action opens an edit form
- Delete action prompts confirmation before removal

For all rows:

- Transaction identity is visible through merchant icon + label
- The row remains readable without relying only on color

### 5.5 Pagination Flow

```text
User reaches table footer
    |
    +-- Result count shown
    +-- Rows-per-page control shown
    +-- Pagination controls shown
```

Behavior:

- Pagination remains lightweight and right-aligned
- Current page has filled active styling
- Footer should not visually overpower the table

### 5.6 Floating Quick Action

The design also shows a floating circular action button near the table edge.

Use:

- Quick add
- Contextual create shortcut

This should feel secondary to the main Add Transaction CTA, not redundant in hierarchy.

---

## 6. Insights Page Flow

The Insights page is a narrative analytics surface rather than a raw data page.

### 6.1 Page Entry

```text
User opens Insights
    |
    v
Top search bar is available
    |
    v
Hero summary card introduces Portfolio Insights
```

The hero card includes:

- Strong page title
- Short explanatory paragraph
- Spacious empty area for calm visual balance

### 6.2 Main Insight Row

The next section is split into two areas:

- Monthly Intelligence panel
- Strategic Advisory card

Monthly Intelligence behavior:

- Large canvas-like card
- Supports live data labeling
- Presents summary metrics at the bottom edge

Strategic Advisory behavior:

- Blue feature card with stronger visual emphasis
- Contains generated recommendation text
- Includes a primary action such as "Execute Optimization"

### 6.3 Secondary Stat Row

Three compact insight cards appear below:

- Top Category
- Month Delta / Spend Trend
- Biggest Single Expense

Behavior:

- Each card surfaces one metric and one supporting descriptor
- Semantic indicators reinforce positive or negative meaning
- This row gives quick, executive-style takeaways

### 6.4 Lower Insight Row

The bottom row contains:

- Saving Streak card
- Daily Spend Velocity chart card

Saving Streak behavior:

- Uses a circular progress/score motif
- Includes supporting copy explaining the streak
- Uses a dashed progress treatment for reinforcement

Daily Spend Velocity behavior:

- Uses a compact weekly bar chart
- Highlights one day in blue while others remain muted
- Presents a micro-trend, not a full analytics dashboard

---

## 7. Navigation Between Pages

```text
Overview -> user wants full records -> Transactions
Transactions -> user wants patterns/story -> Insights
Insights -> user wants operational detail -> Transactions
Any page -> sidebar click returns to another section instantly
```

The product should support fast lateral movement between summary, detail, and interpretation.

---

## 8. Empty and Edge States

### Overview

- If no financial data exists, KPI cards fall back gracefully
- Charts should render an empty state rather than broken axes
- Recent Transactions should show a compact no-data prompt

### Transactions

- Empty search/filter results should keep the toolbar visible
- Table empty state should provide a clear reset path
- Pagination should disappear or simplify when not needed

### Insights

- If insights cannot be computed, cards should still preserve layout
- Recommendation modules should fall back to informative placeholder copy
- Microcharts should not collapse the card structure

---

## 9. State Summary

```text
Global
  - active route
  - role
  - transactions data

Page-level
  - selected chart range on Overview
  - transactions filters and pagination
  - insights search/query state

Derived
  - KPI totals
  - spending breakdown
  - recent transactions preview
  - category and trend insights
  - savings streak and daily spend velocity
```

---

## 10. UX Intent

The three pages create a clear product journey:

1. Overview gives the user a quick portfolio snapshot.
2. Transactions gives the user precise operational control.
3. Insights gives the user interpretation, trends, and recommendations.

The flow should feel calm, premium, and efficient at every step.
