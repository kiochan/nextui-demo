import AppContainer from "../components/view/AppContainer"
import words from "../config/words"

const GalleryPage: React.FC = () => {
    return <AppContainer title={words.site.titles.gallery} subtitle="still under construction" buttonLink="/gallery" buttonText="まだ公開されていません" displayHero>

    </AppContainer>
}

export default GalleryPage