import PageLayout from "../components/layouts/page-layout/page-layout"
import GamesItem from "../components/games/games-item/games-item"
import { Link } from "react-router-dom"

function FavoritesPage({ favorites, onToggleFavorite }) {
  return (
    <div style={{ backgroundColor: "#0e0e1d", minHeight: "100vh", color: "#ffffff" }}>
      <PageLayout>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 style={{ fontWeight: 800, marginBottom: "4px" }}>My Favorites</h1>
            {favorites.length > 0 && (
              <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                {favorites.length} game{favorites.length !== 1 ? "s" : ""} saved
              </span>
            )}
          </div>
          <Link
            to="/"
            style={{
              backgroundColor: "rgba(79,70,229,0.15)",
              border: "1px solid rgba(79,70,229,0.4)",
              color: "#a5b4fc",
              borderRadius: "8px",
              padding: "8px 18px",
              textDecoration: "none",
              fontSize: "0.88rem",
            }}
          >
            ← Back to games
          </Link>
        </div>

        {/* Empty state */}
        {favorites.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "64px 24px",
            border: "1px dashed rgba(79,70,229,0.3)",
            borderRadius: "16px",
            backgroundColor: "rgba(79,70,229,0.04)",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎮</div>
            <h3 style={{ color: "#a5b4fc", fontWeight: 700, marginBottom: "8px" }}>
              No favorites yet
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              Browse the game list and tap ❤️ to save your favorites here.
            </p>
            <Link
              to="/"
              style={{
                backgroundColor: "#4f46e5",
                color: "#fff",
                borderRadius: "8px",
                padding: "10px 24px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Browse games
            </Link>
          </div>
        ) : (
          <div className="row">
            {favorites.map((game) => (
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
      </PageLayout>
    </div>
  )
}

export default FavoritesPage