import AppContainer from "../components/view/AppContainer"
import homeHeroImage from "../images/hero-home.jpg"

const HomePage: React.FC = () => {
    return <AppContainer heroImages={[{ image: homeHeroImage }]} title="宿命 ❖ 挽歌" subtitle="sominia eregita" buttonLink="/shop">

    </AppContainer>
}

export default HomePage