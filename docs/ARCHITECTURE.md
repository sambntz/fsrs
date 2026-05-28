# Frontend Architecture

## Overview

This project uses a **Feature-Based Modular Architecture** with **co-location** principles.

The architecture is designed for:

* scalability
* maintainability
* feature isolation
* backend/frontend co-location
* reusable UI systems
* compatibility with Next.js App Router
* AI/LLM readability

The main principle is:

> Every feature owns its UI, business logic, server logic, hooks, schemas, and types.

Global/shared code only exists when truly reusable across multiple features.

---

# Core Principles

## 1. Feature Ownership

Each feature is autonomous and self-contained.

A feature may contain:

* UI components
* composed components
* frontend business logic
* backend logic
* server actions
* repositories
* hooks
* validation schemas
* DTOs
* types
* utilities
* constants

A feature should be removable with minimal impact on the rest of the application.

---

## 2. Co-Location

Frontend and backend logic related to the same feature must live together.

Example:

```txt
features/products/
```

contains:

* UI
* hooks
* server actions
* services
* repositories
* validation
* types

instead of scattering logic across global folders.

---

## 3. Shared Code Must Be Generic

The `shared` layer must NEVER contain feature-specific business logic.

Allowed examples:

* buttons
* modal
* table primitives
* date utils
* http clients
* logger
* cache
* auth infrastructure
* generic hooks

Forbidden examples:

* product business rules
* dashboard-specific calculations
* auth-specific UI flows

If logic knows about a business domain, it belongs to a feature.

---

## 4. App Router Only Handles Routing

The `app/` directory should remain thin.

Responsibilities:

* routes
* layouts
* loading states
* error boundaries
* metadata

Business logic must live inside features.

---

# Folder Structure

```txt
src/
├── app/
├── features/
├── shared/
├── layouts/
├── styles/
├── middleware.ts
└── env.ts
```

---

# app/

The `app/` directory contains only Next.js routing concerns.

Example:

```txt
app/
├── (auth)/
├── (dashboard)/
├── api/
└── layout.tsx
```

Pages should delegate immediately to feature modules.

Example:

```tsx
import { ProductsPage } from "@/features/products";

export default function Page() {
  return <ProductsPage />;
}
```

The page itself should contain minimal logic.

---

# features/

Features represent business domains.

Examples:

```txt
features/
├── auth/
├── products/
├── dashboard/
├── users/
└── billing/
```

Each feature owns its complete internal architecture.

---

# Feature Internal Structure

Example:

```txt
features/products/
├── components/
├── composed/
├── server/
├── hooks/
├── schemas/
├── types/
├── constants/
├── utils/
├── providers/
├── state/
├── tests/
└── index.ts
```

---

# Feature Layers

## components/

Contains UI components specific to the feature.

Examples:

```txt
product-form.tsx
product-table.tsx
product-filters.tsx
```

These components understand the business domain.

---

## composed/

Contains composed components built from multiple smaller components.

Examples:

```txt
products-page-content.tsx
dashboard-overview.tsx
```

These are usually page sections or feature orchestrators.

---

## server/

Contains backend-related logic for the feature.

Examples:

```txt
products.actions.ts
products.service.ts
products.repository.ts
```

Responsibilities may include:

* database access
* API calls
* server actions
* domain orchestration
* DTO mapping
* caching
* validation

---

## hooks/

Contains feature-specific React hooks.

Examples:

```txt
use-products.ts
use-product-filters.ts
```

Feature hooks may depend on:

* feature services
* feature state
* feature schemas

---

## schemas/

Validation schemas.

Recommended:

* Zod

Examples:

```txt
product.schema.ts
create-product.schema.ts
```

---

## types/

Feature-specific types.

Examples:

```txt
product.types.ts
product.dto.ts
```

---

## constants/

Feature constants.

Examples:

```txt
PRODUCT_STATUS
DEFAULT_PAGE_SIZE
```

---

## utils/

Feature-specific utility functions.

Examples:

```txt
product.mapper.ts
product.formatter.ts
```

---

## state/

Optional local feature state.

Recommended only when necessary.

Suggested tools:

* Zustand
* Context API

Avoid global state unless truly shared.

---

## providers/

Feature-specific providers.

Examples:

* filters provider
* wizard provider
* table provider

---

# shared/

Contains reusable and business-agnostic code.

Example:

```txt
shared/
├── components/
├── server/
├── hooks/
├── lib/
├── utils/
├── types/
├── constants/
└── config/
```

---

# shared/components/

Reusable UI primitives.

Example:

```txt
shared/components/ui/
├── button.tsx
├── input.tsx
├── modal.tsx
└── card.tsx
```

These components MUST NOT contain business logic.

---

# shared/components/data-display/

Reusable composed display systems.

Examples:

```txt
data-table/
filters/
search-bar/
pagination/
```

These components may be configurable but must remain domain-agnostic.

---

# shared/server/

Shared backend infrastructure.

Examples:

```txt
shared/server/
├── http/
├── database/
├── auth/
├── cache/
└── queue/
```

Examples of allowed shared server code:

* Prisma client
* HTTP client
* Redis client
* auth middleware
* API wrappers
* logging
* retry utilities

---

# layouts/

Contains reusable application layouts.

Examples:

```txt
dashboard-layout.tsx
auth-layout.tsx
marketing-layout.tsx
```

Layouts define application structure but not feature logic.

---

# Naming Conventions

## Components

Use kebab-case.

Example:

```txt
product-form.tsx
dashboard-sidebar.tsx
user-table.tsx
```

---

## Hooks

Must start with `use-`.

Examples:

```txt
use-products.ts
use-auth.ts
```

---

## Services

Examples:

```txt
products.service.ts
auth.service.ts
```

---

## Repositories

Examples:

```txt
products.repository.ts
users.repository.ts
```

---

## Server Actions

Examples:

```txt
products.actions.ts
auth.actions.ts
```

---

# Import Rules

## Allowed

Feature importing shared code:

```txt
features/products → shared/*
```

Feature importing itself:

```txt
features/products → features/products/*
```

---

## Forbidden

Shared importing feature code:

```txt
shared/* → features/*
```

Cross-feature imports should be minimized.

Example to avoid:

```txt
features/auth → features/products
```

Prefer extracting reusable logic into `shared`.

---

# State Management

Preferred order:

1. Server Components
2. Local component state
3. Feature-local Zustand/Context
4. Global state only if absolutely necessary

Avoid large centralized stores.

---

# Backend Strategy

Preferred architecture:

```txt
page
  ↓
feature component
  ↓
hook/server action
  ↓
service
  ↓
repository
  ↓
database/api
```

---

# Data Fetching

Preferred order:

1. Server Components
2. Server Actions
3. Route Handlers
4. React Query only when necessary

Avoid unnecessary client-side fetching.

---

# Validation

All external data must be validated.

Recommended:

* Zod

Validation should exist close to the feature.

---

# Recommended Stack

## Core

* Next.js App Router
* TypeScript
* React Server Components
* Server Actions

---

## Validation

* Zod

---

## Tables

* TanStack Table

---

## Forms

* React Hook Form

---

## State

* Zustand (only if needed)

---

## Styling

Preferred:

* TailwindCSS

---

# Architecture Goals

This architecture is optimized for:

* scalability
* modularity
* maintainability
* team collaboration
* AI-assisted development
* feature isolation
* low coupling
* high cohesion

---

# Anti-Patterns

## Forbidden Global Chaos

Avoid:

```txt
services/
helpers/
misc/
common/
```

without clear ownership.

---

## Massive Shared Layer

Do not move code into `shared` too early.

Code should become shared ONLY after proven reuse.

---

## Fat Pages

Avoid placing business logic directly inside:

```txt
app/**/page.tsx
```

Pages should remain thin.

---

## Cross-Feature Coupling

Avoid features depending directly on other features.

Extract reusable logic into `shared`.

---

# Architectural Philosophy

The architecture follows these principles:

* feature-first organization
* vertical slicing
* co-location
* modular boundaries
* separation of concerns
* server-first rendering
* progressive extraction of shared abstractions

The goal is:

> Keep related code together and unrelated code separated.
