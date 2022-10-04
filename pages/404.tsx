import AppContainer from "../components/view/AppContainer"
import words from "../config/words"

const NotFoundPage: React.FC = () => {
    return <AppContainer
        title={words.site.titles.notFound}
        subtitle="page not found"
        buttonLink="/"
        buttonText="Back to Home" displayHero>

    </AppContainer>
}

export default NotFoundPage