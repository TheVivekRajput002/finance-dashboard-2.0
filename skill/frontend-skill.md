---
name: frontend-design-pro
description: Create distinctive, production-grade frontend interfaces with exceptional design quality. Avoid generic AI aesthetics and produce memorable, intentional UI with strong visual identity.
license: Complete terms in LICENSE.txt
---

This skill enables creation of **high-quality, production-ready frontend interfaces** with a strong design point-of-view. It emphasizes **intentional design decisions, bold aesthetics, and real-world usability** — not generic templates.

Use this when the user asks to build:
- UI components
- Landing pages
- Dashboards
- Web apps
- Design systems

---

## 1. Design Thinking First (MANDATORY)

Before writing any code, define:

### Purpose
- What problem does this interface solve?
- Who is the user?
- What context will it be used in?

### Tone (Choose ONE, commit fully)
Pick a strong aesthetic direction:
- Brutalist / raw
- Luxury / refined
- Editorial / magazine
- Retro-futuristic
- Industrial / utilitarian
- Organic / natural
- Playful / toy-like
- Minimal / hyper-clean
- Maximalist / expressive

**No mixing styles. No indecision.**

### The One Memorable Thing
What will the user remember after leaving?

If you cannot answer this → rethink design.

---

## 2. Core Philosophy

- Intentionality > intensity
- Every visual choice must feel deliberate
- Avoid defaults at all costs
- Cohesion is more important than complexity

---

## 3. Typography (Primary Design Lever)

### Rules
- Use **distinctive display font + refined body font**
- Avoid: `Inter`, `Roboto`, `Arial`, `system-ui`
- Use large, expressive headings (e.g. `8vw–12vw`)
- Apply tight tracking for headlines (`letter-spacing: -0.03em`)
- Maintain clear hierarchy

### Good Font Examples
- Playfair Display
- Fraunces
- DM Serif Display
- Syne
- Cabinet Grotesk
- Instrument Serif
- Clash Display

### Scale Example

xs: 0.75rem
sm: 0.875rem
base: 1rem
lg: 1.25rem
xl: 1.5rem
2xl: 2rem
3xl: 3rem
4xl: 4.5rem
5xl: 6rem


---

## 4. Color System (Commit, Don’t Decorate)

### Principles
- One dominant color + one accent
- Use desaturated neutrals (not pure white/black)
- Maintain strong contrast
- Prefer dark or atmospheric backgrounds

### Avoid
- Purple-blue gradients on white
- Teal + purple combo
- Rainbow gradients everywhere

### Example
```css
:root {
  --bg: #0e0e0f;
  --surface: #18181b;
  --border: #2e2e32;
  --text-primary: #f5f5f0;
  --text-muted: #8a8a8f;
  --accent: #e8ff47;
}

5. Layout & Composition
Break Generic Patterns

Avoid:

Centered max-width layouts everywhere
Predictable stacking
Use:
Asymmetry (left-heavy/right-heavy)
Overlapping elements
Full-bleed sections
Grid-breaking typography
Negative space
Grid Example
.layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}
6. Motion & Interaction
Focus on High-Impact Moments
Page load animations (staggered)
Scroll-triggered reveals
Meaningful hover interactions
Avoid
Random animations everywhere
Pure opacity hover effects
Animation Example
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}
7. Background & Atmosphere

Never use flat empty backgrounds unless intentional.

Techniques
Gradient meshes
Noise/grain overlays
SVG textures
Layered transparency
Soft lighting effects
8. Components (Avoid Generic UI)
Buttons
No default rounded blue buttons
Use:
text buttons with animated underline
bordered brutalist buttons
sharp edges or unconventional shapes
Cards
Vary styles (border, no border, background)
Create hierarchy (not equal weight)
Navigation
Experiment:
floating nav
sidebar
minimal nav
Forms
Labels always visible
Strong focus states
Personality in validation
9. AI Slop Checklist (STRICTLY AVOID)
Purple gradient hero
Inter/Roboto everywhere
Centered layout entire page
Identical cards
Generic CTA buttons
3 feature cards in a row
Predictable hero (text left, image right)
Weak hover effects

If any apply → redesign.

10. Implementation Standards

Code must be:

Production-ready
Clean and readable
Fully functional
Responsive
Accessible (basic a11y)
Performance-conscious
Tech Guidelines
HTML/CSS/JS or React/Next.js
Tailwind allowed but must be customized
Use CSS variables for design systems
Prefer CSS animations unless complexity requires JS
11. Creative Direction Execution

Match complexity to style:

Minimal → precision, spacing, typography
Maximal → layered visuals, motion, effects

Never mix both unintentionally.

12. Output Expectations

Every generated UI must:

Feel designed, not generated
Have a clear aesthetic identity
Include at least one memorable detail
Avoid templates or repetition
Reflect strong creative decisions
13. Design Decision Framework

Before coding, answer:

1. What is the chosen aesthetic?
2. What is the memorable element?
3. What fonts define the tone?
4. What is the dominant + accent color?
5. Where does the layout break convention?
6. What is the entry animation?
7. What interaction surprises the user?
8. Does it pass the AI Slop Checklist?