import { Route, Routes } from "react-router"
import { Navbar } from "./components/ui"
import { HomePage } from "./pages"


function App() {

  return (
  <>
   <Navbar />

   <Routes>
   <Route index element={<HomePage />} />
   </Routes>
   </>
  )
}

export default App
