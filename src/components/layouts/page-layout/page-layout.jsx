import { Jumbotron, Navbar } from "../../ui"

function PageLayout({ children, jumbotron, className = "" }) {
  return (
    <>
      <Navbar />  {/* ← Agregar aquí */}
      {jumbotron && (<Jumbotron {...jumbotron} />)}
      <div className={`container py-3 ${className}`}>
        {children}
      </div>
    </>
  )
}

export default PageLayout