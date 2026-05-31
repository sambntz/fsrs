# PRD — Flashcards FSRS MVP

## 1. Overview

Aplicación web de flashcards basada en spaced repetition utilizando la librería `ts-fsrs`.

El sistema permitirá:

* crear mazos (decks)
* importar tarjetas mediante JSON
* estudiar tarjetas utilizando FSRS
* renderizar contenido enriquecido usando HTML limitado
* almacenar progreso individual por usuario
* autenticarse únicamente mediante Google OAuth

El enfoque del MVP es:

* simplicidad
* velocidad
* UX moderna
* automatización mediante IA/LLMs

---

# 2. Objetivo del Producto

Crear una alternativa moderna y simple a Anki enfocada en:

* integración con IA
* importación automática de tarjetas
* experiencia visual moderna
* soporte HTML enriquecido
* repetición espaciada avanzada (FSRS)

---

# 3. Stack Tecnológico

## Frontend

* Next.js (App Router)
* TypeScript
* TailwindCSS
* shadcn/ui
* Framer Motion (animaciones)

## Backend

* Next.js Server Actions / Route Handlers

## ORM

* Prisma ORM

## Base de Datos

* PostgreSQL

## Autenticación

* Auth.js (NextAuth)
* Google Provider únicamente

## Librerías principales

* ts-fsrs
* DOMPurify (sanitización HTML)
* react-hook-form
* zod

---

# 4. Requerimientos Funcionales

## 4.1 Autenticación

### El usuario debe:

* registrarse únicamente con Google
* iniciar sesión con Google
* cerrar sesión

### Restricciones

* no existe login con email/password
* el email de Google identifica unívocamente al usuario

---

# 5. Gestión de Mazos

## El usuario puede:

* crear mazos
* editar nombre y descripción
* eliminar mazos
* listar mazos
* visualizar estadísticas básicas

## Datos del mazo

* id
* nombre
* descripción
* fecha creación
* configuración FSRS
* usuario propietario

---

# 6. Gestión de Tarjetas

## Cada tarjeta contiene

### Obligatorio

* front
* back

### Opcional

* tags
* source
* notes

## Soporte HTML

Los campos `front` y `back` admiten HTML limitado.

### Etiquetas soportadas

* b
* strong
* i
* em
* u
* br
* p
* ul
* ol
* li
* span
* img
* audio
* code
* pre

### Restricciones

* HTML sanitizado antes de renderizar
* scripts prohibidos
* estilos inline limitados o prohibidos

---

# 7. Estudio de Tarjetas

## Flujo

### Paso 1

Mostrar frente de la tarjeta.

### Paso 2

Usuario hace click/tap.

### Paso 3

La tarjeta gira con animación 3D.

### Paso 4

Se muestra reverso.

### Paso 5

Usuario selecciona evaluación FSRS.

---

# 8. Sistema FSRS

## Librería

* ts-fsrs

## Opciones de review

* Again
* Hard
* Good
* Easy

## Datos almacenados por tarjeta

Basado en ts-fsrs:

* due
* stability
* difficulty
* elapsed_days
* scheduled_days
* reps
* lapses
* state
* last_review

## Configuración FSRS por mazo

Cada mazo puede tener:

* parámetros FSRS personalizados
* límites diarios
* nuevos por día
* reviews por día

---

# 9. Importación JSON

## Funcionalidad

El usuario puede importar múltiples tarjetas mediante JSON.

---

## Formato esperado

```json
[
  {
    "front": "<b>Whether</b>",
    "back": "<i>si / ya sea que</i>",
    "tags": ["grammar", "B1"]
  }
]
```

---

## Validaciones

### Requerido

* front
* back

### Opcional

* tags
* source
* notes

### Reglas

* HTML sanitizado
* tamaño máximo configurable
* errores mostrados por línea/tarjeta

---

# 10. UX/UI

## Objetivos

* minimalista
* rápida
* moderna
* mobile friendly

## Componentes

* shadcn/ui

## Animaciones

* Framer Motion

## Interacciones importantes

* flip animation 3D
* hover effects
* progreso visual
* barra de sesión

---

# 11. Dashboard

## El usuario puede visualizar

* mazos
* tarjetas pendientes
* reviews del día
* progreso
* últimas sesiones

---

# 12. Arquitectura de Datos

## User

```ts
id
name
email
image
createdAt
```

## Deck

```ts
id
name
description
userId
fsrsParams
createdAt
updatedAt
```

## Card

```ts
id
deckId
front
back
tags
source
notes
createdAt
updatedAt
```

## Review

```ts
id
cardId
due
stability
difficulty
elapsedDays
scheduledDays
reps
lapses
state
lastReview
createdAt
```

---

# 13. Seguridad

## Sanitización HTML

Usar DOMPurify.

## Restricciones

* bloquear scripts
* bloquear iframes
* bloquear eventos inline
* bloquear javascript URLs

---

# 14. APIs Internas

## Decks

* GET /api/decks
* POST /api/decks
* PATCH /api/decks/:id
* DELETE /api/decks/:id

## Cards

* POST /api/cards/import
* GET /api/cards
* PATCH /api/cards/:id
* DELETE /api/cards/:id

## Reviews

* POST /api/review

---

# 15. Requerimientos No Funcionales

## Performance

* carga rápida
* SSR parcial
* hydration mínima

## Compatibilidad

* desktop
* tablet
* mobile

## Base de datos

* PostgreSQL para MVP y producción

---

# 16. MVP Scope

## Incluido

* login Google
* CRUD mazos
* CRUD tarjetas
* import JSON
* reviews FSRS
* flip animation
* dashboard básico

## No incluido

* sync offline
* multiplayer
* compartir mazos
* audio automático
* OCR
* IA integrada
* mobile app nativa

---

# 17. Roadmap Futuro

## V2

* generación automática con LLM
* extensión Chrome
* import PDF
* markdown support
* imágenes drag/drop
* TTS
* estadísticas avanzadas

## V3

* app móvil
* sincronización cloud
* colaboración
* marketplace de decks

---

# 18. Recomendaciones Técnicas

## ORM recomendado

Prisma.

Razones:

* excelente integración PostgreSQL
* tipado fuerte
* migrations simples
* ecosistema enorme

## UI recomendada

shadcn/ui.

Razones:

* Tailwind nativo
* moderno
* accesible
* fácil customización

## Hosting MVP

* Vercel
* Supabase Postgres
* o PostgreSQL local inicialmente

---

# 19. Riesgos Técnicos

## Riesgo 1

HTML inseguro.

Mitigación:

* DOMPurify estricto.

## Riesgo 2

FSRS mal implementado.

Mitigación:

* encapsular scheduler.
* tests unitarios.

## Riesgo 3

Animaciones lentas mobile.

Mitigación:

* usar transform3d.
* evitar rerenders.

---

# 20. Definición de MVP Completo

El MVP se considera completo cuando:

* un usuario puede registrarse con Google
* crear un mazo
* importar 100+ tarjetas vía JSON
* estudiar usando FSRS
* revisar tarjetas con animaciones fluidas
* mantener persistencia completa de progreso
* utilizar HTML enriquecido seguro
