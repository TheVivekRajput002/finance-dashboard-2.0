# Finance Dashboard UI - Frontend Guidelines

> Product: Zorvyn / FinTrack Finance Dashboard
> Platform: Web
> Purpose: Translate the visual blueprint into implementation rules the frontend should consistently follow

---

## 1. Design Direction

The UI should feel:

- Clean and calm
- Modern, lightweight, and structured
- Friendly rather than corporate-heavy
- Soft and rounded, not sharp or aggressive
- Data-focused, with visual clarity taking priority over decoration

This is a **light dashboard system** built from muted surfaces, rounded containers, restrained shadows, and a small set of purposeful accent colors.

The blueprint suggests a design language closer to:

- Soft neumorphic-lite surfaces
- Pill-based controls
- Spacious cards
- Simple iconography
- Low-noise data presentation

Avoid:

- Dark brutalist styling
- Loud gradients
- Hard black borders across the interface
- Overly saturated charts
- Generic SaaS hero-style styling patterns

---

## 2. Core Visual Principles

Every screen should follow these rules:

- Use a very light neutral app background
- Treat the app as a persistent dashboard shell, not isolated pages
- Place content inside large rounded cards/panels
- Keep spacing generous and consistent
- Let color communicate hierarchy and status
- Prefer subtle separation over heavy dividers
- Keep interactions obvious through fill, outline, and icon treatment
- Prioritize scanability over density

The design should feel modular: each dashboard area should read like a self-contained tile inside a larger system.

The page experience should move through three layers:

- Overview for snapshot
- Transactions for management
- Insights for interpretation

---

## 3. Color System

Use the blueprint palette as the source of truth.

### Primary Tokens

```css
:root {
  --color-primary: #2196f3;
  --color-secondary: #e3f2fd;
  --color-tertiary: #4caf50;
  --color-neutral: #f8fafc;

  --color-surface: #f1f5f9;
  --color-surface-raised: #ffffff;
  --color-border-soft: #d8e0ea;

  --color-text-strong: #1f2937;
  --color-text-body: #4b5563;
  --color-text-muted: #9aa4b2;

  --color-success: #4caf50;
  --color-danger: #c0392b;
  --color-dark: #101418;
  --color-icon-muted: #6b7280;
}
```

### Palette Usage

- `Primary / #2196F3`: primary actions, active nav state, selected chips, emphasis lines
- `Secondary / #E3F2FD`: soft fills, hover surfaces, low-priority highlighted areas
- `Tertiary / #4CAF50`: positive financial signals, success states, income indicators
- `Neutral / #F8FAFC`: page background and low-contrast base surfaces
- `Danger / deep red`: destructive actions only
- `Dark / near-black`: inverted buttons and high-contrast emphasis moments

### Color Rules

- Blue is the dominant interactive color
- Green is reserved for positive finance meaning and supportive accents
- Red should appear sparingly for delete, loss, or negative alerts
- Most of the interface should remain neutral and quiet
- Use tinted fills before using saturated blocks unless the component is primary

Avoid:

- Purple-led palettes
- Harsh black-and-white contrast
- Random one-off colors per widget
- Overusing green outside positive meanings

---

## 4. Typography

The blueprint shows a simple, legible, product-UI typography system.

### Typography Tone

- Clean sans-serif
- Strong readability
- Minimal stylistic friction
- Large, simple display numerics and metrics

### Recommended Approach

- Use a modern sans-serif for the product UI
- Prioritize legibility and dashboard clarity over expressive editorial styling
- Keep labels light and muted
- Keep headings medium-weight, not overly bold
- Use larger type for KPIs and chart summaries

### Hierarchy

- Display / KPI: large, bold, high contrast
- Heading: medium size, medium weight
- Body: regular weight, comfortable reading contrast
- Label / helper text: smaller size, muted color

### Guidance

- Use muted gray for labels
- Use darker gray for main values and headings
- Keep line heights open and relaxed
- Avoid ultra-tight tracking or dramatic display typography

---

## 5. Shape Language

Rounded geometry is a defining part of the blueprint.

### Border Radius

- Main panels/cards: large radius
- Inputs/search fields: pill or rounded capsule
- Buttons/chips: pill radius
- Icon buttons: circular

Suggested implementation:

```css
:root {
  --radius-panel: 24px;
  --radius-card: 20px;
  --radius-control: 999px;
  --radius-icon: 999px;
}
```

### Borders and Shadows

- Use soft borders in place of heavy outlines
- Use very subtle shadows only when needed
- Prefer tonal separation over dramatic elevation

Suggested feel:

- Soft gray border
- Minimal shadow blur
- Bright inner surface against slightly darker page background

---

## 6. Layout and Spacing

The blueprint uses a tile-based dashboard structure with consistent rhythm.

### Layout Rules

- Use a two-part app shell on desktop: left sidebar plus main content area
- Let the main content area support a top utility/header row before page content
- Use cards as the primary composition unit
- Keep consistent gaps between panels
- Build the desktop layout as a clean grid
- Let mobile stack vertically without losing card identity
- Do not crowd charts, filters, and KPI areas together

### Spacing Rhythm

Use an 8px-based spacing system:

- 4px for tight icon alignment only
- 8px for chip/internal control spacing
- 12px to 16px for label-to-field spacing
- 20px to 24px for card padding
- 24px to 32px for gaps between sections

### Composition Guidance

- Each card should contain one primary purpose
- Lead each page with a strong title row and concise supporting text
- Keep a strong margin between navigation, filters, data views, and actions
- Preserve generous whitespace inside cards
- Favor horizontal grouping for controls on desktop and vertical stacking on mobile

### Page Anatomy

The three key screens should follow this structure:

- Overview: header, KPI row, analytics row, supporting intelligence row
- Transactions: header, toolbar filters, table, footer pagination
- Insights: search/header, hero summary, main advisory row, stat row, micro-chart row

---

## 7. Components

### 7.1 Cards

Cards should be:

- Rounded
- Light-surface based
- Low-noise
- Clearly padded
- Visually distinct from the page background

Use cards for:

- KPI summaries
- Charts
- Transactions blocks
- Insights
- Filter groups

### 7.2 Buttons

The blueprint defines four core button states:

- Primary: filled blue with white text
- Secondary: soft light fill with dark text
- Inverted: dark fill with light text
- Outlined: light background with subtle border

Rules:

- Buttons should be pill-shaped
- Padding should feel compact but comfortable
- Avoid square enterprise-style buttons
- Icon + label combinations should align cleanly

### 7.3 Inputs

Search and text inputs should be:

- Pill-shaped
- Light background or white
- Soft bordered
- Spacious horizontally
- Accompanied by a leading icon when helpful

Rules:

- Placeholder text should be muted
- Focus states should use soft blue emphasis
- Inputs should not use harsh browser-default outlines

### 7.4 Navigation

The blueprint suggests icon-first navigation.

Desktop:

- Use a persistent left sidebar
- Keep the brand at the top and utility links at the bottom
- Active item should use a soft blue filled pill treatment
- Navigation labels should remain visible alongside icons

Mobile:

- Bottom navigation should use rounded container styling
- Active tab should be clearly filled

Rules:

- Keep nav icons simple and stroke-based
- Sidebar items should feel calm and low-noise when inactive
- Top-level page context may also appear in the header as compact tabs
- Active state should be obvious even at a glance

### 7.5 Tags, Chips, and Badges

Use pill chips for:

- Category labels
- Filters
- Status markers
- Inline actions

Style guidance:

- Selected chip: blue fill
- Neutral chip: soft background
- Semantic chip: color-coded only when the meaning is important

### 7.6 Icon Buttons

The blueprint uses circular icon actions.

Use for:

- Edit
- Filter
- Tag/category actions
- Delete

Color guidance:

- Blue for primary tools
- Gray for neutral utilities
- Green for positive/supportive tools
- Red for destructive actions

### 7.7 KPI Cards

The Overview page uses compact KPI cards as the first read.

Rules:

- Keep cards short and dense, but not cramped
- Use a small uppercase or muted label
- Show one dominant value
- Add a small circular status icon or semantic marker
- Use supporting text only when it adds context such as trend or source

Preferred KPI set:

- Total Balance
- Total Income
- Total Expenses
- Savings Rate

### 7.8 Tables and Data Rows

The Transactions page uses a clean management table.

Rules:

- Use a rounded container with soft padding around the table
- Keep headers small, muted, and easy to scan
- Use generous row height
- Put primary row identity in the description cell
- Pair merchant/category with a compact icon or avatar when useful
- Align amount values clearly for quick scanning
- Keep actions in a narrow, far-right column

Table content pattern:

- Date
- Description
- Category tag
- Amount
- Actions

### 7.9 Toolbar Filters

The Transactions page toolbar should be a single clean control strip.

Include:

- Search field
- Type filter
- Category filter
- Date range inputs

Rules:

- All controls should share the same soft rounded styling
- Filters should feel lightweight and integrated, not like heavy form fields
- Search should be the most visually prominent control in the row

### 7.10 Insight Modules

The Insights page introduces larger editorial-style data cards.

Use:

- Summary hero card
- Monthly intelligence card
- Strategic advisory feature card
- Small stat cards
- Micro-visualization cards

Rules:

- The hero card should feel spacious and minimal
- The advisory card can use stronger blue emphasis than the rest of the page
- Supporting stat cards should remain clean and compact
- Insight modules should read as recommendations and conclusions, not raw tables

---

## 8. Data Visualization

Charts should match the calm visual system.

### Chart Style Rules

- Use thin to medium-weight strokes
- Use rounded line endings where possible
- Keep chart containers clean and spacious
- Minimize gridline noise
- Use color sparingly and intentionally
- Prefer chart shapes that are easy to read in under 3 seconds

### Chart Color Mapping

- Primary blue: trend, active focus, main metric series
- Neutral dark gray: secondary comparison series
- Green: positive/supporting metric series
- Soft red: expense distribution or negative metric where necessary

### Page-Specific Chart Patterns

Overview:

- Use a vertical bar-based balance evolution chart
- Support compact time-range chips
- Use a donut chart for category breakdown with center value

Insights:

- Use micro bar charts for short-term daily velocity
- Use circular or ring progress motifs for streak/progress moments

### Avoid

- Neon chart palettes
- Heavy legends
- Dense axes clutter
- Decorative chart effects

Data should feel readable first, decorative second.

---

## 9. Motion and Interaction

Motion should be subtle and functional.

### Use Motion For

- Hover feedback on pills and cards
- Focus transitions on inputs
- State changes for nav items and chips
- Modal or drawer entrance
- Chart/filter updates
- Table row hover and action reveal clarity

### Motion Style

- Short duration
- Soft easing
- Slight scale, tint, or shadow shifts
- No dramatic springiness unless intentionally isolated

Recommended behavior:

- 150ms to 250ms transitions for controls
- 200ms to 300ms for panel or modal transitions

Avoid:

- Bouncy UI everywhere
- Long entrance animations
- Decorative floating effects

---

## 10. Accessibility and Usability

The system is visually soft, but usability must remain strong.

Rules:

- Ensure text contrast remains accessible against soft backgrounds
- Keep touch targets comfortable on mobile
- Do not rely on color alone for active/destructive meaning
- Provide visible focus states for keyboard users
- Keep icons paired with labels where meaning is ambiguous
- Avoid making chips or icon-only actions too small

---

## 11. Finance Dashboard-Specific Rules

Because this is a finance product, apply these conventions consistently:

- Income uses green
- Expenses use red
- Neutral financial summaries use dark text on light cards
- Primary business CTAs use blue
- Large amounts should be visually prominent
- Secondary metadata should be muted and quiet
- Tables/lists should remain clean and highly scannable
- AI/recommendation modules should look supportive, not noisy

For transactions:

- Date, description, category, and amount should be easy to scan in one pass
- Use color emphasis only on the amount or status, not every field
- Truncation should preserve layout cleanliness without hiding key values
- Show merchant identity with a small visual cue when available
- Pagination should stay visually quiet and secondary

For KPI cards:

- Show one dominant number
- Keep supporting label concise
- Use subtle accent decoration, not overbuilt ornament

For insights:

- Lead with a plain-language takeaway before deeper metrics
- Recommendation cards should offer a clear next action
- Small stat cards should summarize one story each
- Microcharts should reinforce narrative, not compete with primary data views

---

## 12. Responsive Behavior

### Mobile

- Stack cards vertically
- Keep card padding slightly tighter than desktop
- Use bottom navigation with rounded container treatment
- Let filters collapse into rows or drawers as needed
- Convert dense table controls into scrollable or wrapped toolbars
- Preserve quick access to the primary CTA

### Tablet

- Use 2-column card grids where possible
- Maintain visible spacing between dashboard zones

### Desktop

- Use full dashboard grids
- Keep sidebar or top navigation persistent
- Avoid stretching single cards too wide without internal structure
- Let the content area breathe with generous side padding

---

## 13. Implementation Notes

These guidelines should influence code decisions:

- Define the palette as semantic tokens
- Reuse component variants instead of making one-off styles
- Build button, chip, input, and card primitives first
- Keep chart theming centralized
- Use consistent radius and spacing tokens across the app

If Tailwind is used:

- Extend the theme with semantic colors
- Add reusable radius, spacing, and shadow tokens
- Create variants for button and chip types instead of ad hoc utility strings
- Build reusable shells for KPI cards, table rows, and insight cards

---

## 14. Do / Don't

### Do

- Use soft light surfaces
- Keep controls rounded and compact
- Let blue drive interaction hierarchy
- Reserve green and red for financial meaning
- Keep dashboard sections spacious and modular
- Use muted text for labels and helper content
- Treat Overview, Transactions, and Insights as distinct but related page modes

### Don't

- Reintroduce generic dark-mode-only styling as the default
- Use sharp rectangular cards
- Overfill screens with dense tables and heavy borders
- Add loud gradients or glossy effects
- Treat every button as the same importance level
- Use random colors for charts and badges
- Turn the Insights page into a dense analytics wall
- Turn the Transactions page into a heavy enterprise spreadsheet

---

## 15. Design Check Before Building

Before implementing any major screen, confirm:

1. Does it use the blueprint palette correctly?
2. Are cards, inputs, and buttons rounded in a consistent way?
3. Is blue reserved for primary interactive emphasis?
4. Are green and red used semantically rather than decoratively?
5. Does the layout feel spacious and modular?
6. Are labels muted and data values clearly emphasized?
7. Do charts match the same soft visual language as the rest of the UI?
8. Does the screen feel calm, clear, and finance-focused?
9. Does this page match its role: snapshot, management, or insight?
