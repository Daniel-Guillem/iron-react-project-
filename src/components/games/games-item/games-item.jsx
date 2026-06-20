import { Link } from "react-router-dom";

function GamesItem({
  game,
  favorites,
  onToggleFavorite,
  borderColor,
}) {
  const {
    id,
    name,
    background_image,
    rating,
    genres,
    released,
  } = game 

const isFavorite = favorites.some(
  (favorite) => favorite.id === id
)

  return (
    <div className="card mb-3" style={{ borderColor }}>
    <Link
  to={`/games/${id}`} className="d-block text-decoration-none text-reset">
    
  <div
      className="card mb-0 h-100"
      style={{ borderColor }}
    
    >
    <div></div>
      <div className="row g-0">
        <div className="col-md-4 d-flex">
          <img
            src={background_image}
            className="img-fluid rounded-start"
                alt={name}
                    style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "150px",
                        objectFit: "cover"
                    }}
          />
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>

            <p className="card-subtitle">
              Rating: {rating}
            </p>

            <p className="card-text">
              Genre: {genres}
            </p>
            <p className="card-text">
              Release date: {released}
            </p>
          </div>
        </div>
      </div>
    </div>
    </Link>
    <button
        type="button"
        className={
          isFavorite
            ? "btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
            : "btn btn-outline-danger btn-sm position-absolute top-0 end-0 m-2"
        }
        style={{ zIndex: 2 }}
        onClick={() => onToggleFavorite(game)}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
</div>
  );
}

export default GamesItem;
