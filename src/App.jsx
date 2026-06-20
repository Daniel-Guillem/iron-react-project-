import { HomePage, GameDetailsPage } from './pages'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/ui'

function App() {
  return (
  <>
  <Navbar />

  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/games/:gameId" element={<GameDetailsPage />}/>
  </Routes>
  </>
  )
}

export default App

