import { createContext } from 'react';

interface CartItem {
    id: string
    name: string
    size: 'S' | 'M' | 'L'
    color: string
    amount: number
    price: number
}

type CartItems = CartItem[]

interface GlobalContextData {
    cart: {
        items: CartItems
    },
    token: string | null,
    redirect: string
}

interface GlobalContext {
    data: GlobalContextData,
    setData: (data: GlobalContextData) => void
}

export const defaultStoreValues: GlobalContext['data'] = {
    cart: {
        items: [
        ]
    },
    token: null,
    redirect: "/"
}

const store = createContext<GlobalContext>(null)

export default store