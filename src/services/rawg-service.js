import axios from "axios";

const http = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: { key: "66d0215c02534b8cb6fd75d783bf369c" }
})

function parseGame(game) {
    return {
        id: game.id,
        name: game.name,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        genres: game.genres?.[0]?.name ?? "Unknown",
        platforms:
        game.platforms?.map(
            item => item.platform.name
        ) ?? [],
        stores:
        game.stores?.map(
         item => item.store.name
        ) ?? [],
        players_numbers: game.tags?.[0]?.name ?? "",

    }
}

function joinFilterValues(values) {
  return Array.isArray(values) ? values.join(",") : values
}

export async function listGames(page = 1, search = "", platform = "", genre = "", players = "") {
  const params = { page, page_size: 20 }
  const platformsFilter = joinFilterValues(platform)
  const genresFilter = joinFilterValues(genre)
  const playersFilter = joinFilterValues(players)

  if (search.trim()) params.search = search.trim()
  if (platformsFilter) params.platforms = platformsFilter
  if (genresFilter) params.genres = genresFilter
  if (playersFilter) params.tags = playersFilter

  const { data } = await http.get("/games", { params })

  return {
    games: data.results?.map((game) => parseGame(game)) ?? [],
    count: data.count ?? 0,
    next: data.next,
    previous: data.previous,
  }
}

export async function getGame (gameId) {
    const { data } = await http.get(`/games/${gameId}`)
    return {
        id: data.id,
        name: data.name,
        released: data.released,
        background_image: data.background_image,
        rating: data.rating,
        genres: data.genres[0].name,
        platforms: data.platforms.map(game => game.platform.name),
        stores: data.stores.map(game => game.store.name),
        players_numbers: data.tags[0].name

    }
}
