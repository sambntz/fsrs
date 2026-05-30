---
name: dbia
description: Introspecciona tablas de una base de datos y ejecuta queries SQL usando la herramienta de terminal "dbia".
---

# Database Introspection & Query Skill

Usa la herramienta de terminal `dbia` para interactuar con bases de datos MySQL.

## Comandos disponibles

### Configuración de conexión
- `dbia config` — Mostrar la configuración de conexión actual
- `dbia config:set -h <host> -u <user> -p <password> [-P <port>]` — Configurar conexión a la base de datos (port default: 3306)
- `dbia config:reset` — Eliminar configuración de conexión y base de datos seleccionada

### Base de datos
- `dbia all` — Listar todas las bases de datos disponibles en el servidor
- `dbia use <nombre>` — Seleccionar una base de datos para trabajar
- `dbia db` — Mostrar el nombre de la base de datos actualmente seleccionada

### Introspección y queries
- `dbia tables` — Listar todas las tablas de la base de datos seleccionada
- `dbia show <tabla>` — Mostrar el DDL (CREATE TABLE) de una tabla
- `dbia query "<sql>"` — Ejecutar una consulta SQL

## Flujo de trabajo

1. Verifica si hay conexión configurada con `dbia config`
2. Si no hay conexión, configúrala con `dbia config:set -h <host> -u <user> -p <password>`
3. Lista las bases de datos disponibles con `dbia all`
4. Selecciona una base de datos con `dbia use <nombre>`
5. Lista las tablas disponibles con `dbia tables`
6. Inspecciona la estructura de tablas relevantes con `dbia show <tabla>`
7. Ejecuta queries SQL con `dbia query "<sql>"`

## Reglas

- Siempre verifica que haya una conexión configurada antes de ejecutar comandos que accedan a la base de datos.
- Si no hay conexión configurada, pide al usuario los datos de conexión (host, user, password) y usa `dbia config:set`.
- La base de datos es opcional: `dbia all` funciona sin seleccionar una base de datos específica.
- Al ejecutar queries, envuelve el SQL entre comillas dobles: `dbia query "SELECT * FROM users LIMIT 10"`
- Nunca ejecutes queries destructivas (DROP, DELETE, TRUNCATE, UPDATE) sin confirmación explícita del usuario.
- Usa LIMIT en consultas SELECT para evitar resultados excesivos a menos que el usuario pida todos los registros.
- Muestra los resultados de forma clara y legible.
