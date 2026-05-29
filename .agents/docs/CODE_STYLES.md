# Code Style Guide

## Overview

This document defines the coding conventions, patterns, naming standards, and development principles for the project.

The goals are:

* consistency
* readability
* maintainability
* scalability
* predictability
* AI/LLM-friendly code generation

All code should prioritize:

* clarity over cleverness
* composition over inheritance
* explicitness over magic
* simplicity over abstraction

---

# General Principles

## Prefer Simplicity

Always choose the simplest solution that solves the problem correctly.

Avoid:

* premature abstractions
* unnecessary patterns
* over-engineering
* excessive indirection

---

## Single Responsibility

Each file, function, hook, component, and module should have a single clear responsibility.

Bad:

```ts id="6wq8y1"
component fetching data + validating + formatting + rendering + caching
```

Good:

```ts id="gq8dxy"
hook → fetches data
service → handles API/database
component → renders UI
utils → formatting
```

---

## Prefer Composition

Prefer composing small reusable parts instead of creating large monolithic structures.

Good:

```tsx id="5z0qfm"
<Page>
  <Filters />
  <Table />
  <Pagination />
</Page>
```

Avoid giant components with hundreds of lines.

---

## Avoid Duplication

If logic is repeated more than once, consider extraction.

Preferred extraction order:

1. same component
2. same feature
3. shared layer

Do NOT move code into shared too early.

---

## Explicitness Over Magic

Code should be easy to understand without hidden behavior.

Avoid:

* implicit mutations
* hidden side effects
* deeply nested abstractions
* dynamic unpredictable APIs

Prefer explicit inputs and outputs.

---

# Naming Conventions

---

# Components

## Rules

* Use PascalCase for component names
* File names use kebab-case
* Component name must match file purpose

## Examples

```txt id="0zaj24"
product-form.tsx
dashboard-sidebar.tsx
user-table.tsx
```

```tsx id="d7g3pf"
export function ProductForm() {}
```

---

# Hooks

## Rules

* Must start with `use`
* Must describe behavior
* Avoid generic names

## Examples

```txt id="1z9m0l"
use-products.ts
use-auth.ts
use-product-filters.ts
```

Bad:

```txt id="m4v9s0"
use-data.ts
use-utils.ts
```

---

# Utilities

## Rules

* Use camelCase
* Function name should describe transformation/action

## Examples

```ts id="1x5hzh"
formatCurrency()
mapProductDto()
calculateDiscount()
```

Avoid vague names:

```ts id="rjv4d8"
handleStuff()
processData()
```

---

# Types

## Rules

* Use PascalCase
* Suffix DTOs when applicable
* Prefer domain-oriented naming

## Examples

```ts id="n7l1s3"
Product
CreateProductDto
ProductFilters
```

---

# Constants

## Rules

* Use SCREAMING_SNAKE_CASE
* Group related constants

## Examples

```ts id="04g0az"
MAX_PAGE_SIZE
DEFAULT_TIMEOUT
PRODUCT_STATUS
```

---

# File Naming

## Rules

* Use kebab-case
* File names should reflect purpose

## Examples

```txt id="u1ov8k"
product-table.tsx
auth.service.ts
products.repository.ts
```

---

# TypeScript Rules

## Strict Mode

Strict mode is mandatory.

```json id="s8gf6n"
{
  "strict": true
}
```

---

## Avoid `any`

`any` is forbidden unless absolutely necessary.

Prefer:

```ts id="8g1b2v"
unknown
generics
union types
discriminated unions
```

Bad:

```ts id="gq6g9l"
const data: any
```

---

## Prefer Explicit Types

Function inputs and outputs should be explicit.

Good:

```ts id="h4pb1r"
function calculateTotal(items: CartItem[]): number
```

Avoid implicit unclear types.

---

## Prefer Interfaces for Domain Entities

Use interfaces for entities and contracts.

Example:

```ts id="rf0p2r"
interface Product {
  id: string;
  name: string;
}
```

Use `type` for:

* unions
* mapped types
* utility compositions

---

## Avoid Type Assertions

Avoid:

```ts id="z9f0g7"
value as Something
```

Prefer proper typing and validation.

---

# React Rules

---

# Components

## Keep Components Small

Preferred:

* under 200 lines
* focused responsibility

If a component grows too much:

* extract hooks
* extract child components
* extract business logic

---

## Avoid Business Logic Inside JSX

Bad:

```tsx id="0l8t9m"
return users
  .filter(...)
  .sort(...)
  .map(...)
```

Prefer:

```tsx id="3yrq3i"
const visibleUsers = getVisibleUsers(users);
```

---

## Prefer Server Components

Use Server Components by default.

Use `"use client"` only when needed.

Examples requiring client components:

* state
* effects
* browser APIs
* event handlers

---

## Avoid Deep Prop Drilling

If props pass through many layers:

* extract composition
* use feature providers
* use context carefully

---

# Hooks Rules

## Hooks Must Be Focused

A hook should solve one problem.

Bad:

```ts id="9u3n2l"
useDashboard()
```

that manages:

* auth
* filters
* modals
* analytics
* fetching
* forms

Prefer smaller hooks.

---

## Avoid Massive Hooks

If a hook becomes too large:

* split by concern
* move logic into services/utils

---

## Hooks Must Be Predictable

Hooks should:

* return stable APIs
* avoid hidden side effects
* expose clear contracts

---

# Backend / Server Rules

---

# Services

## Responsibilities

Services contain business logic.

Services may:

* orchestrate repositories
* validate workflows
* map DTOs
* coordinate operations

Services should NOT:

* directly render UI
* contain framework-specific presentation logic

---

# Repositories

## Responsibilities

Repositories handle persistence/data access.

Examples:

* database queries
* external APIs
* cache access

Repositories should NOT contain business rules.

---

# Server Actions

## Rules

Server actions should:

* be thin
* delegate to services
* validate input
* return typed responses

Avoid large server actions.

---

# Validation Rules

All external input must be validated.

Examples:

* forms
* query params
* API payloads
* environment variables

Preferred library:

* Zod

---

# State Management Rules

Preferred order:

1. Server state
2. Local component state
3. Feature-local state
4. Global state only if necessary

Avoid unnecessary global stores.

---

# Styling Rules

## Preferred

* TailwindCSS
* utility-first approach

---

## Avoid

* large global CSS files
* random inline styles
* duplicated utility patterns

---

## Reusable Styling

If styles repeat:

* extract reusable UI component
* extract utility variant

---

# Error Handling

## Rules

Errors must:

* be explicit
* be typed when possible
* provide useful context

Avoid silent failures.

Bad:

```ts id="c1c4fh"
catch (e) {}
```

Good:

```ts id="ah9z0v"
catch (error) {
  logger.error(error);
}
```

---

# Logging

## Rules

Logs should:

* be structured
* contain context
* avoid noise

Avoid random console logs in production code.

---

# Imports

## Order

Preferred import order:

```ts id="4f3r0x"
1. external libraries
2. shared modules
3. feature modules
4. relative imports
```

---

## Avoid Deep Relative Paths

Bad:

```ts id="n0n1j7"
../../../../utils
```

Prefer aliases:

```ts id="0l0x7z"
@/shared/utils
```

---

# Comments

## Rules

Code should be self-explanatory.

Use comments only when:

* explaining WHY
* documenting non-obvious decisions
* warning about edge cases

Avoid obvious comments.

Bad:

```ts id="gx6xkk"
// increment counter
counter++;
```

---

# Testing Philosophy

Tests should prioritize:

* business behavior
* critical flows
* feature stability

Avoid testing implementation details.

---

# Performance Principles

Prefer:

* server rendering
* streaming
* memoization only when necessary
* lazy loading for heavy UI

Avoid premature optimization.

---

# Clean Code Principles

Code should be:

* readable
* predictable
* modular
* cohesive
* loosely coupled

Every developer or LLM should quickly understand:

* what the code does
* where logic belongs
* where to extend functionality
* where to fix issues

---

# Anti-Patterns

## Forbidden

* gigantic components
* massive hooks
* god services
* shared folder dumping
* implicit side effects
* hidden mutations
* business logic inside UI primitives
* feature cross-dependencies
* random utils folders
* uncontrolled global state
* premature abstractions

---

# Preferred Development Philosophy

When adding new code:

1. keep it local first
2. extract only when reuse appears
3. prefer explicit APIs
4. prioritize readability
5. avoid unnecessary abstractions
6. optimize for maintainability
7. keep business logic inside features
8. keep shared code business-agnostic

---

# Final Principle

The codebase should feel:

* modular
* predictable
* discoverable
* scalable
* easy to reason about

The architecture should help developers and LLMs understand:

* where code belongs
* how features interact
* what responsibilities each layer owns
