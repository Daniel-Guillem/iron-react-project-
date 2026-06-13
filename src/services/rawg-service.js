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
        genres: game.genres[0].name,
    }
}

export async function listGames() {
    const { data }  = await http.get('/games')
    return data.results?.map((game) => parseGame(game)) ?? [];
} 
