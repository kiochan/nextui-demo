import AppContainer from "../components/view/AppContainer"
import words from "../config/words"

const NewsPage: React.FC = () => {
    return <AppContainer title={words.site.titles.news} subtitle="still under construction" buttonLink="/news" buttonText="新しいニュースはまだありません" displayHero>

    </AppContainer>
}

export default NewsPage