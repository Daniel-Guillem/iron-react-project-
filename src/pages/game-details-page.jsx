import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "../components/layouts/page-layout/page-layout";
import * as rawgService from "../services/rawg-service";

function GameDetailsPage() {
  const { gameId } = useParams()
  const [game, setGame] = useState(null)

  useEffect(() => {
    async function fetchGame() {
      const gameData = await rawgService.getGame(gameId)
      setGame(gameData)
    }

    fetchGame()
  }, [gameId])

  return (
    <div
      style={{
        backgroundColor: "#0e0e1d",
        minHeight: "100vh",
        color: "#ffffff",
      }}
    >
      <PageLayout>
        {game && (
          <div className="card mx-auto" style={{ maxWidth: "800px" }}>
            <div className="row g-0">
              <div className="col-md-5">
                <img
                  src={game.background_image}
                  className="img-fluid rounded-start h-100"
                  alt={game.name}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="col-md-7">
                <div className="card-body">
                  <h1 className="card-title">{game.name}</h1>

                  <p className="card-text">
                    Rating: {game.rating}
                  </p>

                  <p className="card-text">
                    Genre: {game.genres}
                  </p>

                  <p className="card-text">
                    Release date: {game.released}
                  </p>

                  <p className="card-text">
                    Platforms: {game.platforms.join(", ")}
                  </p>

                  <p className="card-text">
                    Stores: {game.stores.join(", ")}
                  </p>
                  <p className="card-text">
                    Number of Players: {game.players_numbers}
                  </p>

                  <Link to="/" className="btn btn-primary mt-3">
                    Back
                  </Link>
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
