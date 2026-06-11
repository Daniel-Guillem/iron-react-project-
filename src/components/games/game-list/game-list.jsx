import { useState } from "react"

function GamesList () {
const [games, setGames]= useState([])



return(
<>
{games.map((game) => (
    <p key={game.id}>{game.title}</p>
))}
</>
)
}

export default GamesList