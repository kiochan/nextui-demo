import AppContainer from "../components/view/AppContainer"
import words from "../config/words"

const StaffPage: React.FC = () => {
    return <AppContainer title={words.site.titles.staff} subtitle="still under construction" buttonLink="/staff" buttonText="まだ公開されていません" displayHero>

    </AppContainer>
}

export default StaffPage