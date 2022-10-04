import { useRouter } from "next/router"
import useStore from "./useStore"

const exclude = [
    "/login",
    "/register",
    "/redirect"
]

export default function useRedirectEntry() {
    const router = useRouter()
    const [store, setStore] = useStore()

    if (exclude.includes(router.route)) {
        return () => {
            setStore({
                ...store,
                redirect: exclude.includes(store.redirect)
                    ? store.redirect
                    : '/'
            })
            return
        }
    }

    return () => {
        setStore({
            ...store,
            redirect: router.route
        })
        return
    }
}