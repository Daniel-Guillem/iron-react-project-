import { useEffect, useState } from "react"
import * as rawgService from "../../../services/rawg-service" 
import GamesItem from "../games-item/games-item"

function GamesList () {
const [games, setGames]= useState([])

useEffect (() => {
  async function fetchGames() {
    try{
      const games = await rawgService.listGames()
      console.log(games)
      setGames(games)
    } catch(error) {
      console.error(error)
    }

  }

fetchGames()
}, [])

return(
<>
<h3>Game list</h3>
<p></p>
<p></p>
 <div className="row">
    {games.map((game) => (
      <div key={game.id} className="col-md-6">
        <GamesItem game={game} />
      </div>
    ))}
  </div>
</>
)
}

export default GamesList