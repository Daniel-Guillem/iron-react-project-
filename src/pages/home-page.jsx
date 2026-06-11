import PageLayout from "../components/layouts/page-layout/page-layout"
import JumboBg from "../assets/images/background/mario.jpg"
import GamesList from "../components/games/game-list/game-list"

function HomePage() {
    return (
        <PageLayout
        jumbotron={{
            backgroundImage:JumboBg,
            title: 'Buy now',
            subtitle: 'find all your favorite games'
            }}>  
            <p>Lorem ipsum</p>
            <GamesList />
        </PageLayout>
    )
}

export default HomePage