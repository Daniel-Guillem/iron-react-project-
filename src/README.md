# 🎮 Iron Games

Catálogo de videojuegos construido con React, consumiendo la API de [RAWG](https://rawg.io/apidocs). Permite explorar, filtrar y guardar juegos favoritos.

## Funcionalidades

- **Listado de juegos** con paginación (20 por página)
- **Búsqueda** por nombre (con debounce)
- **Filtros combinables**: plataforma, género y modo de juego (single/multiplayer)
- **Detalle de juego**: rating, géneros, plataformas, tiendas, fecha de lanzamiento
- **Favoritos**: marcar/desmarcar juegos y verlos en una página dedicada

## Stack

- React (componentes funcionales + hooks)
- React Router (`/`, `/games/:gameId`, `/favorites`)
- Axios para las llamadas a la API
- Bootstrap (clases utilitarias) + estilos inline / CSS

## Estructura

```
src/
├── pages/
│   ├── home-page.jsx          # Listado + jumbotron
│   ├── game-details-page.jsx  # Ficha de un juego
│   └── favorites.jsx          # Juegos guardados
├── components/
│   ├── games/
│   │   ├── game-list/         # Lista, filtros, búsqueda, paginación
│   │   └── games-item/        # Card de juego + botón de favorito
│   ├── layouts/
│   │   └── page-layout/       # Layout común (navbar + jumbotron + container)
│   └── ui/
│       ├── navbar/
│       └── jumbotron/
└── services/
    └── rawg-service.js        # Llamadas a la API de RAWG
```

## API (RAWG)

`rawg-service.js` expone:

- `listGames(page, search, platform, genre, players)` → lista paginada con filtros
- `getGame(gameId)` → detalle de un juego

Cada juego se normaliza con: `id`, `name`, `released`, `background_image`, `rating`, `genres`, `platforms`, `stores`, `players_numbers`.

## Estado de favoritos

Los favoritos (`favorites`, `onToggleFavorite`) se manejan en el componente raíz y se pasan por props a `HomePage`, `FavoritesPage` y `GamesItem`. No hay persistencia (localStorage/backend) implementada todavía — se pierden al refrescar.

## ⚠️ Pendiente / mejoras

- **Seguridad**: la API key de RAWG está hardcodeada en `rawg-service.js`. Debería moverse a una variable de entorno (`.env` + `import.meta.env` o `process.env`) y no subirse al repo.
- Persistir favoritos (localStorage o backend).
- Manejo de errores en `getGame` (asume que `genres`, `platforms`, etc. siempre existen, a diferencia de `parseGame` que usa optional chaining).

## Instalación

```bash
npm install
npm start
```
