function Navbar() {
    return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <a className="navbar-brand" href="#">Iron Games</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="main-navbar">
      <span className="navbar-text">
        Top 1 videogames store 
      </span>
    </div>
  </div>
</nav>
    )
}

export default Navbar