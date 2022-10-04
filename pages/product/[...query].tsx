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

function parsePage(str: string | undefined | null, max = Infinity): number {
    if (str === undefined || str === null || str === "") return 1
    return Math.max(Math.min(Math.floor(+str), max), 1)
}

function needRedirect(str: string): boolean {
    const pageNumber = parsePage(str)
    return String(pageNumber) !== str
}

interface ShopItem {
    id: string
    name: string
    image: string
    prise: number
    description: string
}

const shopItemLIst: ShopItem[] = new Array(1005).fill(0)
    .map((_, i) => (
        {
            id: String(i),
            name: "商品 " + String(i + 1).padStart(4, '0'),
            image: '',
            prise: 10000 + i * 10 + (i * 0.05 % 0.52),
            description: '製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明'

        }) as ShopItem)



const ShopPage: React.FC = () => {

    const router = useRouter()
    const query = router.query?.query ?? []

    let page: number = 1
    const howManyPerPage = 24

    let search: string | void = undefined
    if (query.length > 1) {
        search = query[1]
    }

    const currentShopItemLIst = shopItemLIst
        .filter(data => (
            search ? data.name.match(search) : true
        ))

    const totalPage = Math.ceil(currentShopItemLIst.length / howManyPerPage)
    console.log(currentShopItemLIst.length)

    const searchInfo = search ? `「${search}」の検索結果` : 'すべての商品を表示'
    const [searchText, setSearchText] = useState<string>('')

    useEffect(() => {
        setSearchText(search || '')
    }, [search])

    page = parsePage(query[0], totalPage)

    const onSearchChange = useCallback((search: string) => {
        setSearchText(search);
    }, []);

    const onSearch = useCallback(() => {
        router.push(`/shop/${1}/${searchText}`)
    }, [router, searchText])

    const onPageChange = useCallback((page: number) => {
        router.push(`/shop/${page}/${searchText}`)
    }, [router, searchText])

    if (isNaN(page)) return <NotFoundPage></NotFoundPage>

    return <AppContainer title={words.site.titles.shop} shortBanner heroImages={[{ image: homeHeroImage }]}>

        <ContentHeader
            enableSearch
            searchValue={searchText}
            onSearch={onSearch}
            onSearchChange={onSearchChange}
        >
            {searchInfo}
        </ContentHeader>

        {/* there should be some items around */}
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "5rem 0" }}>
            <Box sx={{
                width: "100%",
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
            }}>

                {
                    shopItemLIst ?
                        <Grid.Container gap={2} css={{ mw: "1000px" }} justify="flex-start"> {
                            currentShopItemLIst
                                .slice(
                                    (page - 1) * howManyPerPage,
                                    (page) * howManyPerPage
                                )
                                .map((data, i) => {
                                    return (
                                        <Grid key={i} xs={12} sm={4}>
                                            <Card isPressable>
                                                <Card.Body css={{ p: 0 }}>
                                                    <Card.Image
                                                        src={"/product-images/" + i % 7 + ".jpg"}
                                                        objectFit="cover"
                                                        width="100%"
                                                        height={340}
                                                        alt={data.name}
                                                    />
                                                </Card.Body>
                                                <Card.Body css={{ py: "$10" }}>
                                                    <Text small>
                                                        {data.description}
                                                    </Text>
                                                </Card.Body>
                                                <Card.Divider />
                                                <Card.Footer css={{ justifyItems: "flex-start" }}>
                                                    <Row wrap="wrap" justify="space-between" align="center">
                                                        <Text b>{data.name}</Text>
                                                        <Text css={{ fontSize: "$sm" }}>
                                                            {'¥ ' + data.prise.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                        </Text>
                                                    </Row>
                                                </Card.Footer>
                                            </Card>
                                        </Grid>
                                    )
                                })
                        }  </Grid.Container>
                        : <Typography sx={{
                            fontSize: {
                                xs: '1rem',
                                sm: '2rem',
                                md: '3rem',
                            },
                            transition: "font-size 2s"
                        }}>
                            {`まだ商品を輸入していません。`}
                        </Typography>
                }

            </Box>
        </Box >

        <ContentPageSelector onChange={onPageChange} current={page} min={1} max={totalPage}></ContentPageSelector>

    </AppContainer>
}

export default ShopPage