import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import AppContainer from "../../components/view/AppContainer"
import words from "../../config/words"
import homeHeroImage from "../../images/hero-home.jpg"
import NotFoundPage from '../404'
import ContentHeader from "../../components/view/ContentHeader"
import ContentPageSelector from "../../components/view/ContentPageSelector"
import { Box, Typography } from "@mui/material"

import { Card, Grid, Row, Text } from "@nextui-org/react";
import useShopItems from "../../fake-data/useShopItems"

function parsePage(str: string | undefined | null, max = Infinity): number {
    if (str === undefined || str === null || str === "") return 1
    return Math.max(Math.min(Math.floor(+str), max), 1)
}

function needRedirect(str: string): boolean {
    const pageNumber = parsePage(str)
    return String(pageNumber) !== str
}

const ShopPage: React.FC = () => {

    const router = useRouter()
    const query = router.query?.query ?? []

    const shopItems = useShopItems()

    const id = query[0]

    const product = shopItems.filter(i => i.id === id)[0]

    if (!product) return <NotFoundPage></NotFoundPage>

    return <AppContainer title={words.site.titles.productDetails} shortBanner heroImages={[{ image: homeHeroImage }]}>

        <pre>
            {
                JSON.stringify(product)
            }
        </pre>

        <ContentHeader>
            {product.name}
        </ContentHeader>

    </AppContainer>
}

export default ShopPage