import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "../components/layouts/page-layout/page-layout";
import * as rawgService from "../services/rawg-service";

function getRatingColor(rating) {
  if (rating >= 4) return "#22c55e"
  if (rating >= 3) return "#facc15"
  return "#ef4444"
}

function InfoRow({ label, value }) {
  return (
    <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "flex-start",
      marginBottom: "10px",
    }}>
      <span style={{
        color: "#6b7280",
        fontSize: "0.8rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        minWidth: "100px",
        paddingTop: "2px",
      }}>
        {label}
      </span>
      <span style={{ color: "#e5e7eb", fontSize: "0.9rem" }}>
        {value}
      </span>
    </div>
  )
}

function GameDetailsPage() {
  const { gameId } = useParams()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGame() {
      setLoading(true)
      const gameData = await rawgService.getGame(gameId)
      setGame(gameData)
      setLoading(false)
    }
    fetchGame()
  }, [gameId])

  return (
    <div style={{ backgroundColor: "#0e0e1d", minHeight: "100vh", color: "#ffffff" }}>
      <PageLayout>
        {loading && (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-3 text-white">Loading game...</span>
          </div>
        )}

        {game && (
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <Link
              to="/"
              className="btn mb-4 d-inline-flex align-items-center gap-2"
              style={{
                backgroundColor: "rgba(79,70,229,0.15)",
                border: "1px solid rgba(79,70,229,0.4)",
                color: "#a5b4fc",
                borderRadius: "8px",
                fontSize: "0.88rem",
              }}
            >
              ← Back to games
            </Link>

            <div style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(79,70,229,0.3)",
              backgroundColor: "#13132a",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}>
              {/* Hero image */}
              <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                <img
                  src={game.background_image}
                  alt={game.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, #13132a 0%, rgba(19,19,42,0.2) 60%, transparent 100%)",
                }} />
                {/* Rating sobre la imagen */}
                <div style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  backgroundColor: `${getRatingColor(game.rating)}22`,
                  border: `1px solid ${getRatingColor(game.rating)}66`,
                  borderRadius: "10px",
                  padding: "6px 14px",
                  color: getRatingColor(game.rating),
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  backdropFilter: "blur(8px)",
                }}>
                  ★ {game.rating}
                </div>
              </div>

              {/* Contenido */}
              <div style={{ padding: "24px 28px 28px" }}>
                <h1 style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  marginBottom: "20px",
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}>
                  {game.name}
                </h1>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 24px",
                }}>
                  <InfoRow label="Genre" value={game.genres} />
                  <InfoRow label="Released" value={game.released} />
                  <InfoRow label="Players" value={game.players_numbers} />
                  <InfoRow label="Platforms" value={game.platforms.join(", ")} />
                  <InfoRow label="Stores" value={game.stores.join(", ")} />
                </div>
              </div>
            </div>
          </div>
        )}
      </PageLayout>
    </div>
  )
}

export default GameDetailsPage