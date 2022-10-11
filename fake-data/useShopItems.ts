interface ShopItem {
    id: string
    name: string
    image: string
    prise: number
    description: string
}

const shopItems: ShopItem[] = new Array(1005).fill(0)
    .map((_, i) => ({
        id: String(i),
        name: "商品 " + String(i + 1).padStart(4, '0'),
        image: "/product-images/" + i % 7 + ".jpg",
        prise: 10000 + i * 10 + (i * 0.05 % 0.52),
        description: '製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明製品説明'

    }) as ShopItem)

const useShopItems = () => shopItems

export default useShopItems
