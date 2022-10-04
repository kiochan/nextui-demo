import { Box, Typography } from "@mui/material"
import useUserInfo from "../components/hooks/useUserInfo"
import AppContainer from "../components/view/AppContainer"
import words from "../config/words"

import homeHeroImage from "../images/hero-home.jpg"

const OrdersPage: React.FC = () => {

    const userInfo = useUserInfo()

    return <AppContainer title={words.site.titles.orders} shortBanner heroImages={[{ image: homeHeroImage }]}>

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{
                width: {
                    xs: 300,
                    sm: 400,
                    md: 500,
                },
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
            }}>

                {
                    userInfo.id ?
                        <>
                            <Typography>
                                {`カスタマーID：${userInfo.id}`}
                            </Typography>

                            <Typography>
                                {`名前：${userInfo.name}`}
                            </Typography>

                            <Typography>
                                {`メールアドレス：${userInfo.email}`}
                            </Typography>

                            <Typography>
                                {`まだ注文はありません。`}
                            </Typography>
                        </> :

                        <Typography>
                            このページを表示するにはログインが必要です
                        </Typography>
                }

            </Box>
        </Box >
    </AppContainer>
}

export default OrdersPage