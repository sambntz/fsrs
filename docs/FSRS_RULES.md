# FSRS Rules

## Overview

This document defines the mandatory rules and invariants for the FSRS (Free Spaced Repetition Scheduler) implementation.

The purpose is to:

* preserve scheduler correctness
* avoid invalid card states
* maintain algorithm integrity
* ensure deterministic review behavior
* prevent accidental AI/LLM corruption of scheduling logic

The scheduler is a critical system.

Incorrect modifications can permanently damage review quality and memory prediction accuracy.

---

# Official Scheduler

## Mandatory Library

Use:

```txt id="3rwqke"
ts-fsrs
```

as the single source of truth for scheduling calculations.

---

# Core Principle

## NEVER Implement Scheduling Logic Manually

The FSRS scheduler owns all scheduling calculations.

The application must NEVER:

* manually calculate intervals
* manually modify difficulty
* manually modify stability
* manually compute due dates
* manually infer retrievability
* manually estimate next review

All scheduling decisions must come from the official scheduler output.

---

# Scheduler Ownership

The scheduler exclusively controls:

* intervals
* due dates
* difficulty
* stability
* retrievability
* state transitions
* review scheduling

The application layer must only:

* provide review input
* persist scheduler output
* display scheduling information

---

# Forbidden Operations

## NEVER Modify Intervals Manually

Forbidden:

```ts id="m8r3tx"
card.interval += 1;
```

```ts id="6n4q9j"
card.due = addDays(new Date(), 7);
```

All intervals must come from FSRS output.

---

## NEVER Recalculate Stability

Forbidden:

```ts id="mbd0hk"
card.stability = previousStability * 1.2;
```

Only FSRS may calculate stability.

---

## NEVER Recalculate Difficulty

Forbidden:

```ts id="0r7zzv"
card.difficulty -= 0.1;
```

Difficulty is scheduler-owned state.

---

## NEVER Skip Scheduler Transitions

Every review MUST pass through the scheduler.

Forbidden:

* direct state mutation
* fake reviews
* manual promotion/demotion
* bypassing review states

---

## NEVER Mutate Card State Arbitrarily

Forbidden:

```ts id="9o5x1j"
card.state = "review";
```

unless returned by official scheduler output.

---

# Required Persistence Fields

The following fields MUST always be persisted exactly as returned by FSRS.

---

## Required Fields

```txt id="xj8k2o"
due
stability
difficulty
elapsed_days
scheduled_days
reps
lapses
state
last_review
```

---

## Important

Never partially persist scheduler state.

Scheduler output must be stored atomically.

---

# Review Flow

## Official Grades

Only the official FSRS grades are allowed:

```txt id="x5xg7u"
Again
Hard
Good
Easy
```

No custom grades.

No numeric replacements.

No modified rating scales.

---

# Review Process

## Correct Flow

```txt id="vjlwmk"
1. user reviews card
2. user selects rating
3. FSRS scheduler processes review
4. scheduler returns updated card state
5. application persists full scheduler output
```

---

# Scheduler Boundary

## FSRS Is a Pure Scheduling Engine

The scheduler should remain isolated from:

* UI
* React state
* presentation logic
* database concerns
* analytics concerns

The scheduler only:

* receives card state
* receives review grade
* returns updated scheduling state

---

# Time Handling Rules

## Always Use Real Timestamps

Use actual timestamps for:

* review time
* due calculation
* elapsed days

Avoid:

* fake timestamps
* client-side guessed time
* hardcoded dates

---

## Use UTC Consistently

All persisted review timestamps should use UTC.

Avoid timezone-dependent scheduling behavior.

---

# Card Lifecycle Rules

---

# New Cards

New cards must:

* start with official FSRS initialization
* never contain guessed stability/difficulty values

---

# Learning Cards

Learning state transitions must come from scheduler output only.

---

# Review Cards

Review cards must always preserve:

* stability continuity
* difficulty continuity
* review history continuity

---

# Relearning Cards

Lapses must always be processed through official FSRS review handling.

---

# Historical Integrity

## Review History Is Critical

Review history must NEVER be:

* rewritten
* approximated
* regenerated
* inferred

The quality of future scheduling depends on accurate historical data.

---

# Review Logging

Every review should persist:

```txt id="e2tzsc"
card_id
rating
review_time
previous_state
new_state
previous_due
new_due
stability
difficulty
elapsed_days
scheduled_days
```

---

# Determinism

The same:

* card state
* review rating
* review time

must always produce the same scheduler result.

Avoid hidden randomness.

---

# AI/LLM Safety Rules

When generating code involving FSRS:

* NEVER invent scheduling formulas
* NEVER estimate intervals manually
* NEVER bypass scheduler output
* NEVER mutate scheduler state directly
* NEVER fake stability calculations
* NEVER infer due dates independently

The scheduler is the authority.

---

# Separation of Concerns

## FSRS Layer Responsibilities

The FSRS layer owns:

* scheduling
* memory modeling
* interval calculation
* retrievability prediction

---

## Application Responsibilities

The application owns:

* rendering UI
* collecting ratings
* persistence
* analytics
* filtering
* search
* organization

---

# Database Rules

## Persist Exact Values

Do not:

* round values
* normalize values
* compress values
* simplify scheduler state

Persist the exact scheduler output.

---

# Migration Rules

When changing FSRS versions:

* preserve review history
* preserve scheduler state
* validate migration compatibility
* avoid silent recalculations

---

# Testing Rules

FSRS-related tests should verify:

* deterministic scheduling
* state persistence integrity
* review transitions
* lapse handling
* interval progression
* scheduler compatibility

---

# Performance Rules

Avoid:

* recomputing scheduler state unnecessarily
* recalculating reviews repeatedly
* client-side bulk scheduling

Prefer:

* server-side scheduling
* batched persistence
* immutable review processing

---

# Error Handling

If scheduler processing fails:

* do NOT partially persist state
* do NOT guess next intervals
* do NOT fallback to manual scheduling

Fail safely.

---

# Anti-Patterns

## Forbidden

* custom spaced repetition formulas
* manual interval tweaking
* hidden scheduling multipliers
* client-side interval overrides
* fake due dates
* partial scheduler persistence
* mutable review history
* scheduler bypasses
* alternative rating scales

---

# Final Principle

The FSRS scheduler is the single source of truth.

The application must trust the scheduler completely.

All scheduling behavior must originate from official FSRS outputs only.
