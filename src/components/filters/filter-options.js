// RAWG usa IDs numéricos para plataformas
export const PLATFORM_OPTIONS = [
  { value: "4", label: "PC" },
  { value: "187", label: "PlayStation 5" },
  { value: "18", label: "PlayStation 4" },
  { value: "186", label: "Xbox Series X" },
  { value: "1", label: "Xbox One" },
  { value: "3", label: "iOS" },
  { value: "83", label: "Nintendo 3DS" },
  { value: "7", label: "Nintendo Switch" },
]

// RAWG usa slugs para géneros
export const GENRE_OPTIONS = [
  { value: "action", label: "Action" },
  { value: "strategy", label: "Strategy" },
  { value: "role-playing-games-rpg", label: "RPG" },
  { value: "shooter", label: "Shooter" },
  { value: "adventure", label: "Adventure" },
  { value: "puzzle", label: "Puzzle" },
  { value: "racing", label: "Racing" },
  { value: "sports", label: "Sports" },
  { value: "platformer", label: "Platformer" },
]

// RAWG usa tags para singleplayer/multiplayer
export const PLAYERS_OPTIONS = [
  { value: "singleplayer", label: "Singleplayer" },
  { value: "multiplayer", label: "Multiplayer" },
]

export const FILTER_SELECT_STYLE = {
  backgroundColor: "#111122",
  border: "1px solid #4F46E5",
  borderRadius: "8px",
  color: "#FFFFFF",
  minWidth: "190px",
  padding: "0.375rem 2rem 0.375rem 0.75rem",
  boxShadow: "0 0 10px rgba(79, 70, 229, 0.22)",
}

export const PAGE_SIZE = 20