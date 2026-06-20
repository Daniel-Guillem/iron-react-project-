import { Link } from "react-router-dom";
import logo from "../../../assets/images/background/logo.png";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark py-0"
      style={{
        backgroundColor: '#000000',
        borderBottom: '1px solid #4f46e5',
        height: '76px',
        overflow: 'hidden',
      }}
    >
      <div className="container align-items-center h-100">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center py-0 h-100"
        >
          <img
            src={logo}
            alt="Iron Games"
            style={{ height: "150px", width: "auto", flexShrink: 0 }}
          />
        </Link>
        <div className="collapse navbar-collapse" id="main-navbar">
          <Link
            to="/favorites"
            className="btn ms-auto"
            style={{
              borderColor: "#ef4444",
              color: "#ffffff",
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              boxShadow: "0 0 12px rgba(239, 68, 68, 0.35)",
            }}
          >
            My Favorite Games
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

//<Link to="/"
