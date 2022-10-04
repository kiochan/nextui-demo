import { useContext } from "react"
import store from "../../store"

export default function useStore() {
    const storeValues = useContext(store)
    return [storeValues?.data, storeValues?.setData] as const
}