# UI Guidelines

## Overview

This document defines the visual design principles, UI standards, interaction patterns, and component styling rules for the application.

The goals are:

* visual consistency
* modern aesthetics
* clean layouts
* predictable UX
* scalable design system
* AI/LLM-friendly UI generation

The UI should feel:

* modern
* minimal
* elegant
* fast
* clean
* professional

Primary inspirations:

* Linear
* Notion
* Vercel
* Stripe Dashboard
* Raycast
* GitHub
* Supabase

---

# Design Philosophy

## Minimal First

The interface should prioritize clarity over decoration.

Avoid:

* unnecessary visual noise
* excessive colors
* oversized shadows
* cluttered layouts
* excessive borders
* over-animated interfaces

The UI should feel lightweight and focused.

---

## Functional Beauty

Every visual element must have a purpose.

Good UI is:

* readable
* structured
* predictable
* accessible
* visually balanced

Avoid purely decorative complexity.

---

## Consistency Over Creativity

Prefer consistency across the application instead of creating unique styles for each page.

Spacing, typography, cards, buttons, inputs, and interactions should behave predictably.

---

# Component Library

## Mandatory

Use:

* shadcn/ui

as the primary component system.

---

## Base Stack

Preferred stack:

* shadcn/ui
* TailwindCSS
* Framer Motion
* Lucide Icons

---

# General Visual Style

## Preferred Style

The UI should be:

* minimal
* modern
* clean
* soft
* spacious
* elegant

---

## Avoid

* skeuomorphic design
* glassmorphism everywhere
* neon aesthetics
* excessive gradients
* aggressive animations
* overly colorful UIs
* dashboard chaos
* dense enterprise-style layouts

---

# Layout Guidelines

## Spacing

Spacing must be consistent.

Preferred spacing scale:

```txt id="6u1syo"
4
6
8
10
12
16
20
24
32
```

Prefer generous spacing over compressed layouts.

---

## Padding

Cards and containers should have comfortable internal spacing.

Preferred:

```txt id="mjlwm8"
p-4
p-6
p-8
```

Avoid tiny cramped padding.

---

## Container Widths

Avoid overly wide content.

Preferred:

```txt id="pkk8mq"
max-w-2xl
max-w-4xl
max-w-6xl
max-w-7xl
```

depending on content type.

---

## Grid Usage

Use grids for structured layouts.

Preferred:

```txt id="p5l99t"
grid
gap-4
gap-6
gap-8
```

Avoid crowded multi-column layouts.

---

# Typography

## General Rules

Typography should prioritize readability.

Preferred:

* medium font weights
* strong hierarchy
* balanced spacing

Avoid:

* excessive font sizes
* tiny unreadable text
* inconsistent weights

---

## Font Recommendations

Preferred fonts:

* Inter
* Geist
* system-ui

---

## Hierarchy

Use clear typography hierarchy.

Preferred:

```txt id="sxq3m4"
Heading:
text-2xl
text-3xl
font-semibold

Subheading:
text-lg
text-xl

Body:
text-sm
text-base

Muted:
text-muted-foreground
```

---

# Colors

## Philosophy

Color should support structure, not dominate the UI.

Use restrained color palettes.

---

## Preferred Palette

* neutral backgrounds
* subtle borders
* soft contrast
* limited accent colors

---

## Avoid

* saturated colors everywhere
* rainbow dashboards
* too many accent colors
* strong gradients in core UI

---

# Cards

## Style

Cards should feel soft and modern.

Preferred:

```txt id="0m8l3e"
rounded-2xl
border
bg-card
shadow-sm
```

---

## Hover States

Use subtle hover interactions.

Preferred:

```txt id="0tz0w6"
hover:shadow-md
transition-all
duration-200
```

Avoid dramatic hover effects.

---

## Card Layout

Cards should:

* contain clear hierarchy
* have breathing room
* avoid overcrowding

---

# Buttons

## Style

Buttons should feel modern and compact.

Preferred:

* medium height
* rounded corners
* subtle transitions

---

## Sizes

Preferred:

```txt id="mr4kqf"
h-9
h-10
h-11
```

Avoid oversized buttons.

---

## Variants

Preferred usage:

* primary
* secondary
* ghost
* destructive

Avoid too many button variants.

---

# Inputs

## Style

Inputs should:

* be clean
* have clear focus states
* integrate naturally with layouts

Preferred:

* rounded-lg or rounded-xl
* subtle borders
* strong focus rings

---

## Avoid

* thick borders
* glowing effects
* oversized inputs

---

# Tables

## Philosophy

Tables should prioritize readability.

Preferred:

* compact but breathable
* subtle borders
* aligned spacing
* sticky headers when useful

---

## Features

Reusable tables may include:

* search
* filters
* pagination
* sorting
* bulk actions

Use:

* TanStack Table

---

# Modals

## Rules

Modals should:

* remain focused
* avoid excessive content
* support scrolling when necessary

Preferred:

* centered layout
* soft animations
* rounded corners

---

# Forms

## Layout

Forms should:

* have clear grouping
* proper spacing
* visible labels
* obvious validation states

Preferred spacing:

```txt id="62d3lw"
space-y-4
space-y-6
```

---

## Validation

Validation messages should:

* be concise
* appear near inputs
* use subtle destructive colors

---

# Navigation

## Sidebar

Preferred sidebar style:

* compact
* collapsible
* icon + label
* subtle active states

Avoid heavy enterprise sidebars.

---

## Topbar

Topbars should:

* remain lightweight
* avoid excessive controls
* prioritize content visibility

---

# Empty States

Empty states should:

* explain context
* provide next actions
* remain visually lightweight

Include:

* icon
* short title
* concise description
* optional CTA

---

# Loading States

Preferred:

* skeleton loaders
* subtle opacity transitions

Avoid:

* large spinners everywhere
* blocking interfaces

---

# Animations

## Mandatory Library

Use:

* Framer Motion

for complex animations.

---

## Philosophy

Animations should:

* feel fast
* feel smooth
* improve UX
* never distract

---

## Preferred Animation Style

* subtle
* responsive
* short duration
* soft easing

Preferred duration:

```txt id="1ohx0m"
150ms
200ms
300ms
```

---

## Avoid

* bouncing everywhere
* exaggerated spring physics
* slow transitions
* flashy animations

---

# Shadows

## Preferred

Use soft shadows only when needed.

Preferred:

```txt id="g4p2xx"
shadow-sm
shadow-md
```

Avoid:

* giant shadows
* dark heavy shadows

---

# Borders

Preferred:

* subtle borders
* low contrast separators

Avoid:

* thick borders everywhere
* excessive separators

---

# Icons

## Preferred Library

Use:

* Lucide React

---

## Rules

Icons should:

* remain consistent
* support meaning
* avoid visual clutter

Preferred sizes:

```txt id="h4v7l4"
size-4
size-5
```

---

# Responsive Design

## Mobile First

All layouts must work on:

* desktop
* tablet
* mobile

---

## Rules

Avoid:

* horizontal scrolling
* overcrowded mobile layouts
* desktop-only thinking

Prefer stacked layouts on small screens.

---

# Accessibility

## Requirements

UI must support:

* keyboard navigation
* focus visibility
* readable contrast
* semantic HTML

---

## Interactive Elements

Interactive elements must:

* have hover states
* have focus states
* have disabled states

---

# Dashboard Guidelines

Dashboards should:

* prioritize hierarchy
* avoid information overload
* group related content
* use whitespace intentionally

Avoid chaotic admin panel designs.

---

# AI/LLM UI Generation Rules

When generating UI:

* prioritize readability
* use spacing generously
* keep layouts clean
* avoid over-engineering
* use reusable components
* prefer composition
* keep visual hierarchy clear
* use consistent patterns
* avoid random styling decisions

---

# Preferred Tailwind Patterns

## Cards

```txt id="82kq4u"
rounded-2xl border bg-card shadow-sm
```

---

## Page Containers

```txt id="yph8t4"
mx-auto w-full max-w-7xl space-y-6 p-6
```

---

## Section Layouts

```txt id="g7efcb"
space-y-4
space-y-6
space-y-8
```

---

## Responsive Grids

```txt id="3pyx1s"
grid gap-6 md:grid-cols-2 xl:grid-cols-3
```

---

# Anti-Patterns

## Forbidden

* cramped layouts
* inconsistent spacing
* giant shadows
* too many colors
* flashy animations
* giant modals
* nested scrollbars
* inconsistent typography
* random border radius usage
* enterprise legacy aesthetics
* visually noisy dashboards

---

# Final Principle

The interface should feel:

* calm
* modern
* structured
* lightweight
* premium
* effortless

The best UI is the one that feels obvious to use.
