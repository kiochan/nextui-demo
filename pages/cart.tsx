import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import AppContainer from "../components/view/AppContainer"
import CartItems from "../components/view/CartItems"
import ShopItem from "../components/view/ShopItem"
import words from "../config/words"
import homeHeroImage from "../images/hero-home.jpg"

const HomePage: React.FC = () => {
    return <AppContainer title={"ショッピングカート"} shortBanner heroImages={[{ image: homeHeroImage }]}>

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{
                width: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "100%",
                    xl: 1200,
                },
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
            }}>

                <Typography sx={{
                    margin: "2rem"
                }}>
                    CART
                </Typography>

                <CartItems></CartItems>

                <Button color="secondary" disabled variant="outlined" sx={{
                    margin: "2rem"
                }}>
                    Checkout
                </Button>

            </Box >
        </Box >

    </AppContainer>
}

export default HomePage