import { useEffect, useState } from "react"
import * as rawgService from "../../../services/rawg-service"
import GamesItem from "../games-item/games-item"
import MultiFilterDropdown from "../../filters/multi-filter-dropdown"
import {
  PLATFORM_OPTIONS,
  GENRE_OPTIONS,
  PLAYERS_OPTIONS,
  FILTER_SELECT_STYLE,
} from "../../filters/filter-options"

const PAGE_SIZE = 20

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
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

        {/* Platform filter */}
        <MultiFilterDropdown
          label="All Platforms"
          options={PLATFORM_OPTIONS}
          selectedValues={platform}
          onChange={(values) => {
            setPlatform(values)
            setPage(1)
          }}
          style={FILTER_SELECT_STYLE}
        />

        {/* Genre filter */}
        <MultiFilterDropdown
          label="All Genre"
          options={GENRE_OPTIONS}
          selectedValues={genre}
          onChange={(values) => {
            setGenre(values)
            setPage(1)
          }}
          style={FILTER_SELECT_STYLE}
        />

        {/* Players filter */}
        <MultiFilterDropdown
          label="Players"
          options={PLAYERS_OPTIONS}
          selectedValues={players}
          onChange={(values) => {
            setPlayers(values)
            setPage(1)
          }}
          style={FILTER_SELECT_STYLE}
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