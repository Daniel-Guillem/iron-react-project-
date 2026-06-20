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

function GamesList({ favorites, onToggleFavorite }) {
  const [games, setGames] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")

  const debouncedSearch = useDebounce(search, 250)
  const filterSelectStyle = {
    backgroundColor: "#111122",
    border: "1px solid #4f46e5",
    borderRadius: "8px",
    color: "#ffffff",
    minWidth: "150px",
    padding: "0.375rem 2rem 0.375rem 0.75rem",
    boxShadow: "0 0 10px rgba(79, 70, 229, 0.22)",
  }

  useEffect(() => {
    let ignoreResponse = false

    async function fetchGames() {
      setLoading(true)
      setError(null)

      try {
        const result = await rawgService.listGames(page, debouncedSearch)
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
  }, [page, debouncedSearch])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0">Game list</h3>
        {totalCount > 0 && (
          <span style={{ color: "#a5b4fc", fontSize: "0.9rem" }}>
            Page {page} of {totalPages.toLocaleString()} - {totalCount.toLocaleString()} games total
          </span>
        )}
      </div>

      <div className="mb-4 d-flex align-items-center gap-2 flex-wrap">
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
              backgroundColor: "#ffffff",
              border: "1px solid #4f46e5",
              color: "#000000",
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
                color: "#6b7280",
                cursor: "pointer",
                fontSize: "1rem",
                lineHeight: 1,
              }}
            >
              x
            </button>
          )}
        </div>
        
<div>

  <select style={filterSelectStyle}>
    <option value="">Platforms</option>
    <option value="pc">PC</option>
    <option value="playstation5">PlayStation 5</option>
    <option value="playstation4">PlayStation 4</option>
    <option value="xbox-series-x">Xbox Series X</option>
    <option value="xbox-one">Xbox One</option>
    <option value="ios">iOS</option>
    <option value="nintendo">Nintendo</option>
    <option value="nintendo-switch">Nintendo Switch</option>
  </select>

</div>

<div>

  <select style={filterSelectStyle}>
    <option value="">Genre</option>
    <option value="action">Action</option>
    <option value="strategy">Strategy</option>
    <option value="role-playing-games-rpg">RPG</option>
    <option value="shooter">Shooter</option>
    <option value="adventure">Adventure</option>
    <option value="puzzle">Puzzle</option>
    <option value="racing">Racing</option>
    <option value="sports">Sports</option>
  </select>

</div>

<div>

  <select style={{ ...filterSelectStyle, minWidth: "190px" }}>
    <option value="">Number of Players</option>
    <option value="singleplayer">Singleplayer</option>
    <option value="multiplayer">Multiplayer</option>
  </select>

</div>

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
        <div className="text-center py-5" style={{ color: "#a5b4fc" }}>
          No games found for "{debouncedSearch}".
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
          style={{ borderColor: "#4f46e5", color: "#a5b4fc" }}
        >
          Previous page
        </button>

        <span style={{ color: "#a5b4fc", minWidth: "100px", textAlign: "center" }}>
          {page} / {totalPages > 0 ? totalPages.toLocaleString() : "..."}
        </span>

        <button
          className="btn px-4"
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNext || loading}
          style={{ backgroundColor: "#4f46e5", color: "#ffffff", border: "none" }}
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
            color: "#ffffff",
            backgroundColor: "#4f46e5",
          }}
        >
          Back to page 1
        </button>
      </div>
    </>
  )
}

export default GamesList
