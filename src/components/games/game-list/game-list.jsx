import { useEffect, useState } from "react"
import * as rawgService from "../../../services/rawg-service"
import GamesItem from "../games-item/games-item"

const PAGE_SIZE = 20

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

function MultiFilterDropdown({ label, options, selectedValues, onChange, style }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedCount = selectedValues.length
  const buttonText = selectedCount > 0 ? `${label} (${selectedCount})` : label

  function toggleValue(value) {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((selectedValue) => selectedValue !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  return (
    <details
      className="position-relative"
      open={isOpen}
      onMouseLeave={() => setIsOpen(false)}
      style={{ width: "190px" }}
    >
      <summary
        onClick={(e) => {
          e.preventDefault()
          setIsOpen((open) => !open)
        }}
        style={{
          ...style,
          alignItems: "center",
          display: "flex",
          gap: "0.75rem",
          justifyContent: "space-between",
          cursor: "pointer",
          listStyle: "none",
          userSelect: "none",
          width: "100%",
        }}
      >
        <span>{buttonText}</span>
        <span
          style={{
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "6px solid #FFFFFF",
            height: 0,
            width: 0,
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.15s ease",
          }}
        />
      </summary>
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          zIndex: 10,
          width: "100%",
          backgroundColor: "#111122",
          border: "1px solid #4F46E5",
          borderRadius: "8px",
          boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35)",
          padding: "0.5rem",
        }}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="d-flex align-items-center gap-2"
            style={{
              color: "#FFFFFF",
              cursor: "pointer",
              padding: "0.25rem 0.35rem",
              whiteSpace: "nowrap",
            }}
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => toggleValue(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </details>
  )
}

function GamesList({ favorites, onToggleFavorite }) {
  const [games, setGames] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [platform, setPlatform] = useState([])
  const [genre, setGenre] = useState([])
  const [players, setPlayers] = useState([])

  const debouncedSearch = useDebounce(search, 250)
  const hasActiveFilters = search.trim() || platform.length > 0 || genre.length > 0 || players.length > 0
  const platformOptions = [
    { value: "4", label: "PC" },
    { value: "187", label: "PlayStation 5" },
    { value: "18", label: "PlayStation 4" },
    { value: "186", label: "Xbox Series X" },
    { value: "1", label: "Xbox One" },
    { value: "3", label: "iOS" },
    { value: "83", label: "Nintendo 3DS" },
    { value: "7", label: "Nintendo Switch" },
  ]
  const genreOptions = [
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
  const playersOptions = [
    { value: "singleplayer", label: "Singleplayer" },
    { value: "multiplayer", label: "Multiplayer" },
  ]

  const filterSelectStyle = {
    backgroundColor: "#111122",
    border: "1px solid #4F46E5",
    borderRadius: "8px",
    color: "#FFFFFF",
    minWidth: "190px",
    padding: "0.375rem 2rem 0.375rem 0.75rem",
    boxShadow: "0 0 10px rgba(79, 70, 229, 0.22)",
  }

  function deleteAllFilters() {
    setSearch("")
    setPlatform([])
    setGenre([])
    setPlayers([])
    setPage(1)
  }

  useEffect(() => {
    let ignoreResponse = false

    async function fetchGames() {
      setLoading(true)
      setError(null)
      try {
        const result = await rawgService.listGames(page, debouncedSearch, platform, genre, players)
        if (ignoreResponse) return
        setGames(result.games)
        setTotalCount(result.count)
        setHasNext(!!result.next)
        setHasPrev(!!result.previous)
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch (err) {
        if (ignoreResponse) return
        console.error(err)
        setError("There was a problem searching games.")
      } finally {
        if (!ignoreResponse) {
          setLoading(false)
        }
      }
    }

    fetchGames()
    return () => {
      ignoreResponse = true
    }
  }, [page, debouncedSearch, platform, genre, players])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0">Game list</h3>
        {totalCount > 0 && (
          <span style={{ color: "#A5B4FC", fontSize: "0.9rem" }}>
            Page {page} of {totalPages.toLocaleString()} - {totalCount.toLocaleString()} games total
          </span>
        )}
      </div>

      <div className="mb-4 d-flex align-items-center gap-2 flex-wrap">
        {/* Search */}
        <div className="position-relative" style={{ width: "400px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search games..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            style={{
              backgroundColor: "#1a1a35",
              border: "1px solid #4F46E5",
              color: "#ffffff",
              borderRadius: "8px",
              paddingLeft: "1rem",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "1rem",
                lineHeight: 1,
              }}
            >
              x
            </button>
          )}
        </div>

        {/* Platform filter — RAWG usa IDs numéricos para plataformas */}
        <MultiFilterDropdown
          label="All Platforms"
          options={platformOptions}
          selectedValues={platform}
          onChange={(values) => {
            setPlatform(values)
            setPage(1)
          }}
          style={filterSelectStyle}
        />

        {/* Genre filter — RAWG usa slugs para géneros */}
        <MultiFilterDropdown
          label="All Genre"
          options={genreOptions}
          selectedValues={genre}
          onChange={(values) => {
            setGenre(values)
            setPage(1)
          }}
          style={filterSelectStyle}
        />

        {/* Players filter — RAWG usa tags para singleplayer/multiplayer */}
        <MultiFilterDropdown
          label="Players"
          options={playersOptions}
          selectedValues={players}
          onChange={(values) => {
            setPlayers(values)
            setPage(1)
          }}
          style={filterSelectStyle}
        />
        
        {hasActiveFilters && (
          <div>
            <button
              className="btn px-4"
              onClick={deleteAllFilters}
              style={{
                border: "none",
                color: "#FFFFFF",
                backgroundColor: "#4F46E5",
              }}
            >
              Delete All Filters
            </button>
          </div>
        )}
      </div>

      


      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-3 text-white">Loading games...</span>
        </div>
      ) : games.length === 0 ? (
        <div className="text-center py-5" style={{ color: "#A5B4FC" }}>
          No games found{debouncedSearch ? ` for "${debouncedSearch}"` : ""}.
        </div>
      ) : (
        <div className="row">
          {games.map((game) => (
            <div key={game.id} className="col-md-6">
              <GamesItem
                game={game}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center gap-3 py-4 mt-2">
        <button
          className="btn btn-outline-light px-4"
          onClick={() => setPage((p) => p - 1)}
          disabled={!hasPrev || loading}
          style={{ borderColor: "#4F46E5", color: "#A5B4FC" }}
        >
          Previous page
        </button>
        <span style={{ color: "#A5B4FC", minWidth: "100px", textAlign: "center" }}>
          {page} / {totalPages > 0 ? totalPages.toLocaleString() : "..."}
        </span>
        <button
          className="btn px-4"
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNext || loading}
          style={{ backgroundColor: "#4F46E5", color: "#FFFFFF", border: "none" }}
        >
          Next page
        </button>
      </div>

      <div className="d-flex justify-content-center pb-4">
        <button
          className="btn px-4"
          onClick={() => setPage(1)}
          disabled={page === 1 || loading}
          style={{
            border: "none",
            color: "#FFFFFF",
            backgroundColor: "#4F46E5",
          }}
        >
          Back to page 1
        </button>
      </div>
    </>
  )
}

export default GamesList
