import { Link } from "react-router-dom";

function GamesItem({ game: { id, name, background_image, rating, genres, released } }) {
  return (
    
    <Link
  to={`/games/${id}`} className="d-block text-decoration-none text-reset">
    
  <div
      className="card mb-2"
    
    >
    <div></div>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={background_image}
            className="img-fluid rounded-start"
                alt={name}
                    style={{
                        width: "100%",
                        height: "150px",
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
  );
}

export default GamesItem;