import { HomePage, GameDetailsPage, FavoritesPage } from './pages'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/ui'
import { useEffect, useState } from "react";

function getStoredFavorites() {
  try {
    const storedFavorites = localStorage.getItem("favoriteGames")

    return storedFavorites
      ? JSON.parse(storedFavorites)
      : []
  } catch {
    return []
  }
} 

function App() {
  const [favorites, setFavorites] = useState(getStoredFavorites)

  useEffect(() => {
    localStorage.setItem(
      "favoriteGames",
      JSON.stringify(favorites)
    )
  }, [favorites])

  function toggleFavorite(game) {
    setFavorites((currentFavorites) => {
      const isAlreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === game.id
      )

      if (isAlreadyFavorite) {
        return currentFavorites.filter(
          (favorite) => favorite.id !== game.id
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

export default App
