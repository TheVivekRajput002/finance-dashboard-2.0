
# Finance Dashboard UI — Product Requirements Document

**CONFIDENTIAL**

## PRODUCT REQUIREMENTS DOCUMENT

**Finance Dashboard UI**  
Frontend Engineering Assessment  
**FinTrack | Version 1.0 | April 2025**

---

### Document Information

|Field|Value|
|---|---|
|Document Type|Product Requirements Document|
|Status|Final – v1.0|
|Product|Finance Dashboard UI|
|Platform|Web (React)|
|Author|Vivek Rajput|
|Date|April 2025|
|Audience|Frontend Engineers|
|Assessment|Technical Evaluation|

---

## 1. Executive Summary & Purpose

This document defines the full product requirements for the Finance Dashboard UI, an interactive single-page web application designed to help individual users track, explore, and understand their personal financial activity.

It serves dual purposes:

- Formal product specification
    
- Thinking artifact (design decisions, tradeoffs, rationale)
    

#### Why write a PRD for an assessment?

Good engineers:

- Don’t just write code
    
- Understand _what_ and _why_ before coding
    

A PRD ensures:

- Clear scope
    
- Defined edge cases
    
- Predictable state behavior
    
- Measurable evaluation
    

The dashboard:

- Built using Nextjs (client-side only)
    
- Uses static/mock data
    
- No backend required
    

Goal:

- UI design quality
    
- Component architecture
    
- State management
    
- Responsive design
    

---

## 2. Problem Statement & User Goals

Most finance tools are:

- Too complex → full accounting software
    
- Too simple → spreadsheets
    

This dashboard aims for:

- Clean
    
- Scannable
    
- Insightful
    

---

### 2.1 Primary User Goals

1. Understand financial health instantly
    
2. Explore transactions via filters/sorting
    
3. Identify patterns (categories, trends)
    
4. Trust the system (proper states handling)
    

---

### 2.2 Thinking: Why Role-Based UI?

Role simulation (Viewer vs Admin) tests:

- Conditional rendering
    
- State-driven UI
    
- Interface behavior based on role
    

#### Design reasoning

Admin features:

- Add/edit only visible for admin
    
- Role toggle is visible in UI (not hidden)
    

---

## 3. Scope & Out of Scope

|In Scope|Out of Scope|
|---|---|
|Dashboard KPI cards|No backend/API|
|Charts (trend + category)|No authentication|
|Transactions (filter/sort/search)|No multi-user|
|Insights panel|No server pagination|
|Role simulation|No payment integration|
|Add/edit transactions|No mobile app|
|Responsive layout|No E2E tests|
|Empty/error states|No i18n|
|Optional enhancements|No full accessibility audit|

---

## 4. Data Model & Mock Data Strategy

Uses static mock data.

---

### 4.1 Transaction Object

|Field|Type|Description|
|---|---|---|
|id|string|UUID|
|date|ISO 8601|e.g. 2025-03-15|
|amount|number|Always positive|
|type|income \| expense|Defines sign|
|category|string|Predefined categories|
|description|string|Human-readable|
|merchant|string|Optional|

---

### 4.2 Dataset Requirements

- 40–60 transactions
    
- 3+ months data
    
- 6+ categories
    
- Income + expense
    
- One empty month
    
- One single-entry category
    

#### Design reasoning

Sparse data hides bugs.  
Rich data exposes real-world issues.

---

## 5. Feature Requirements

---

### 5.1 Dashboard Overview

---

#### 5.1.1 KPI Cards

|Feature|Description|Priority|Criteria|
|---|---|---|---|
|Total Balance|Income - Expense|P0|Updates correctly|
|Total Income|Sum income|P0|Currency formatted|
|Total Expenses|Sum expense|P0|Styled red|
|Savings Rate|((I - E)/I) ×100|P1|Percentage|

#### Design reasoning

- 4 cards = optimal balance
    
- Savings Rate = derived state
    

---

#### 5.1.2 Balance Trend Chart

|Feature|Description|Priority|Criteria|
|---|---|---|---|
|Line/Area Chart|Balance over time|P0|Tooltip + axes|
|Time Toggle|1M / 3M / 6M / All|P1|Re-render|
|Bars|Income vs expense|P1|Responsive|

---

#### 5.1.3 Spending Breakdown

|Feature|Description|Priority|Criteria|
|---|---|---|---|
|Donut Chart|Category %|P0|Interactive|
|Legend|Category list|P0|Sorted|
|Empty State|No data fallback|P0|Graceful|

---

### 5.2 Transactions

---

#### 5.2.1 List Display

|Feature|Description|Priority|
|---|---|---|
|Row|Full transaction info|P0|
|Category Badge|Color-coded|P1|
|Pagination|10–20 rows|P1|
|Empty State|No results message|P0|

---

#### 5.2.2 Filtering & Search

|Feature|Description|Priority|
|---|---|---|
|Search|Debounced|P0|
|Type Filter|Income/Expense|P0|
|Category Filter|Multi-select|P1|
|Date Range|From/To|P1|
|Sort|Date/Amount|P0|
|Clear Filters|Reset|P1|

---

### 5.3 Role-Based UI

|Capability|Viewer|Admin|
|---|---|---|
|View dashboard|✓|✓|
|View transactions|✓|✓|
|Insights|✓|✓|
|Add|✗|✓|
|Edit|✗|✓|
|Delete|✗|✓|
|Export|✗|✓|

---

### 5.3.1 Add/Edit Form

|Feature|Description|
|---|---|
|Amount|Numeric|
|Type|Toggle|
|Category|Required|
|Date|No future|
|Description|Max 80 chars|
|Submit|Valid only|

#### Design reasoning

Inline validation improves UX.

---

### 5.4 Insights Panel

|Feature|Description|Priority|
|---|---|---|
|Top Category|Highest spend|P0|
|MoM Comparison|Month delta|P0|
|Biggest Expense|Largest txn|P1|
|Avg Daily Spend|Derived|P1|
|Saving Streak|Optional|P2|

#### Design reasoning

Insights = conclusions, not raw data.

---

## 6. State Management

---

### 6.1 State Types

|Domain|Scope|Storage|
|---|---|---|
|Transactions|Global|Store|
|Role|Global|Store|
|Filters|Page|Local|
|UI State|Component|useState|
|Derived|Computed|useMemo|

---

### 6.2 Preferred Approaches

1. Zustand
    
2. Context + Reducer
    
3. Redux Toolkit
    
4. useState (limited)
    

---

### 6.3 Rules

- No derived state in store
    
- Central mutation logic
    
- Persistent filters
    
- Global role access
    

---

## 7. UI/UX

---

### 7.1 Layout

- Desktop → Sidebar
    
- Mobile → Bottom tab
    

---

### 7.2 Breakpoints

|Device|Width|Behavior|
|---|---|---|
|Mobile|<768px|Single column|
|Tablet|768–1024|2-column|
|Desktop|>1024|Full layout|

---

### 7.3 Design Principles

- Blue primary
    
- Green = income
    
- Red = expense
    
- Inter font
    
- 4/8px spacing
    
- Minimal chart clutter
    

---

### 7.4 Edge Cases

- No data → CTA
    
- Empty filters → reset option
    
- Single txn → charts stable
    
- Long text → truncate
    
- Large numbers → formatted
    

---

## 8. Optional Enhancements

|Feature|Why|
|---|---|
|Dark Mode|UX + accessibility|
|Local Storage|Persistence|
|Export|Practical feature|
|Animations|Better UX|
|Mock API|Async handling|

---

## 9. Technical Stack

---

### 9.1 Stack

|Layer|Tech|
|---|---|
|Framework|React + Vite|
|Styling|Tailwind|
|State|Zustand|
|Charts|Recharts|
|Icons|Lucide|
|Routing|React Router|
|Date|date-fns|
|Types|TypeScript|

---

### 9.2 Structure

src/
  components/
  features/
  hooks/
  store/
  data/
  utils/
  types/
  App.tsx
  main.tsx

---

## 10. Evaluation Criteria

|Criteria|Weight|
|---|---|
|Design|15%|
|Responsiveness|15%|
|Functionality|20%|
|UX|15%|
|Code Quality|15%|
|State Mgmt|10%|
|Docs|5%|
|Detail|5%|

---

## 11. Submission Checklist

- KPI cards
    
- Charts (time + category)
    
- Transactions list
    
- Filters & search
    
- Role toggle
    
- Admin CRUD
    
- Insights
    
- Responsive UI
    
- README
    

Optional:

- Dark mode
    
- Persistence
    
- Export
    

---

## 12. Design Decisions

- Static data → simplicity
    
- Savings rate → top priority
    
- Donut chart → better proportions
    
- Debounced search → performance
    
- Header role toggle → visibility
