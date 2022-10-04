import { getDbInstance } from "./utils"
import { cloneDeep } from "lodash"

export type ShopItemParam = {
    type: 'number'
    value: number
} | {
    type: string[]
    value: string
}

export interface ShopItem {
    id: string
    name: string
    tags: string[]
    price: number | string
    param: {
        [key: string]: ShopItemParam
    }
}

export interface ShopItems {
    items: ShopItem[]
}

export async function init() {
    return await getDbInstance<ShopItems>('token', { items: [] })
}

export async function createShopItem(newItem: ShopItem) {
    const store = await init()
    store.data.items.push(newItem)
    store.write()
}

export async function updateShopItem(id: string, replace: ShopItem) {
    const store = await init()
    for (const item of store.data.items) {
        if (item.id === id) {
            const idx = store.data.items.indexOf(item)
            store.data[idx] = { ...item, ...replace }
            store.write()
        }
    }
}

export async function deleteShopItem(id) {
    const store = await init()
    const _id = id
    const items = store.data.items.filter(({ id }) => id !== _id)
    if (store.data.items.length !== items.length) {
        store.data.items = items
        store.write()
    }
}

export async function getAllShopItem() {
    const store = await init()
    return cloneDeep(store.data)
}
