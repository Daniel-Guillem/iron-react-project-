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

      return [...currentFavorites, game]
    })
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/games/:gameId"
          element={<GameDetailsPage />}
        />

        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>
    </>
  )
}

