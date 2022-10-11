import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import AppContainer from "../../components/view/AppContainer"
import words from "../../config/words"
import homeHeroImage from "../../images/hero-home.jpg"
import NotFoundPage from '../404'
import ContentHeader from "../../components/view/ContentHeader"
import ContentPageSelector from "../../components/view/ContentPageSelector"
import { Box, Typography } from "@mui/material"

import { Card, Grid, Row, Text, Button } from "@nextui-org/react";
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

    const shopItems = useShopItems()

    const router = useRouter()
    const query = router.query?.query ?? []

    let page: number = 1
    const howManyPerPage = 24

    let search: string | void = undefined
    if (query.length > 1) {
        search = query[1]
    }

    const currentShopItemLIst = shopItems
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
                    shopItems ?
                        <Grid.Container gap={2} css={{ mw: "1000px" }} justify="flex-start"> {
                            currentShopItemLIst
                                .slice(
                                    (page - 1) * howManyPerPage,
                                    (page) * howManyPerPage
                                )
                                .map((data, i) => {
                                    return (
                                        <Grid key={i} xs={12} sm={4}>
                                            <Card isPressable onClick={
                                                () => {
                                                    router.push('/product/' + data.id)
                                                }
                                            }>
                                                <Card.Body css={{ p: 0 }}>
                                                    <Card.Image
                                                        src={data.image}
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