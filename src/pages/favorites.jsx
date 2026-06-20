import PageLayout from "../components/layouts/page-layout/page-layout"
import GamesItem from "../components/games/games-item/games-item"
import { Link } from "react-router-dom";


function FavoritesPage({
  favorites,
  onToggleFavorite,
}) {
  const pageBackgroundColor = "#0e0e1d"

  return (
    <div
      style={{
        backgroundColor: pageBackgroundColor,
        minHeight: "100vh",
        color: "#ffffff",
      }}
    >
      <PageLayout>
        <h1>Favorite games</h1>

        {favorites.length === 0 ? (
          <p>You have not added any favorite games yet.</p>
        ) : (
          <div className="row">
            {favorites.map((game) => (
              <div
                key={game.id}
                className="col-md-6"
              >
                <GamesItem
                  game={game}
                  favorites={favorites}
                  onToggleFavorite={onToggleFavorite}
                  borderColor={pageBackgroundColor}
                />
              </div>
            ))}
          </div>
        )}

        <Link to="/" className="btn btn-primary mt-3">
            Back
        </Link>
      </PageLayout>
    </div>
  )
}

export default FavoritesPage
