import PageLayout from "../components/layouts/page-layout/page-layout"
import JumboBg from "../assets/images/background/mario.jpg"
import GamesList from "../components/games/game-list/game-list"

function HomePage({ favorites, onToggleFavorite,}) {
  return (
    <div style={{ backgroundColor: '#0e0e1d', minHeight: '100vh', color: '#ffffff' }}>
      <PageLayout
        jumbotron={{
          backgroundImage: JumboBg,
          title: 'Level up your library',
          subtitle: 'Discover thousands of games and your next obsession.'
        }}>
        <p></p>
        <GamesList  favorites={favorites} onToggleFavorite={onToggleFavorite}/>
      </PageLayout>
    </div>
  )
}

export default HomePage