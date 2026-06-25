import { Link } from "react-router-dom";

const GENRE_COLORS = {
  Action:     { bg: "rgba(239,68,68,0.18)",   text: "#f87171" },
  Shooter:    { bg: "rgba(249,115,22,0.18)",  text: "#fb923c" },
  RPG:        { bg: "rgba(168,85,247,0.18)",  text: "#c084fc" },
  Strategy:   { bg: "rgba(59,130,246,0.18)",  text: "#60a5fa" },
  Adventure:  { bg: "rgba(20,184,166,0.18)",  text: "#2dd4bf" },
  Puzzle:     { bg: "rgba(234,179,8,0.18)",   text: "#facc15" },
  Racing:     { bg: "rgba(16,185,129,0.18)",  text: "#34d399" },
  Sports:     { bg: "rgba(6,182,212,0.18)",   text: "#22d3ee" },
}

function getRatingColor(rating) {
  if (rating >= 4) return "#22c55e"
  if (rating >= 3) return "#facc15"
  return "#ef4444"
}

function GenreBadge({ genre }) {
  const colors = GENRE_COLORS[genre] ?? { bg: "rgba(79,70,229,0.18)", text: "#a5b4fc" }
  return (
    <span style={{
      backgroundColor: colors.bg,
      color: colors.text,
      borderRadius: "999px",
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.04em",
      padding: "2px 10px",
      textTransform: "uppercase",
    }}>
      {genre}
    </span>
  )
}

function RatingBadge({ rating }) {
  const color = getRatingColor(rating)
  return (
    <span style={{
      backgroundColor: `${color}22`,
      border: `1px solid ${color}55`,
      borderRadius: "6px",
      color,
      fontSize: "0.8rem",
      fontWeight: 700,
      padding: "2px 8px",
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
    }}>
      ★ {rating}
    </span>
  )
}

function GamesItem({ game, favorites, onToggleFavorite }) {
  const { id, name, background_image, rating, genres, released } = game

  const isFavorite = favorites.some((f) => f.id === id)

  return (
    <div
      className="mb-3 position-relative"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(79,70,229,0.3)",
        backgroundColor: "#13132a",
        transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
        boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(79,70,229,0.35)"
        e.currentTarget.style.borderColor = "rgba(79,70,229,0.7)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.35)"
        e.currentTarget.style.borderColor = "rgba(79,70,229,0.3)"
      }}
    >
      <Link to={`/games/${id}`} className="d-flex text-decoration-none" style={{ minHeight: "150px" }}>
        {/* Imagen */}
        <div style={{ width: "160px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
          <img
            src={background_image}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* Gradiente lateral para mezclar con el card */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, transparent 70%, #13132a 100%)",
          }} />
        </div>

        {/* Contenido */}
        <div style={{ padding: "14px 16px 14px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, minWidth: 0 }}>
          <div>
            <h5 style={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "1rem",
              marginBottom: "8px",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {name}
            </h5>
            <GenreBadge genre={genres} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
            <RatingBadge rating={rating} />
            <span style={{ color: "#6b7280", fontSize: "0.78rem" }}>
              {released}
            </span>
          </div>
        </div>
      </Link>

      {/* Botón favorito */}
      <button
        type="button"
        onClick={() => onToggleFavorite(game)}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 2,
          background: isFavorite ? "rgba(239,68,68,0.2)" : "rgba(0,0,0,0.5)",
          border: `1px solid ${isFavorite ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.15)"}`,
          borderRadius: "8px",
          width: "34px",
          height: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "1rem",
          transition: "background 0.15s, border-color 0.15s, transform 0.1s",
          backdropFilter: "blur(4px)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.15)" }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)" }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  )
}

export default GamesItem
