import { useRouter } from "next/router"
import { useCallback } from "react"

export default function useRedirectTo() {
    const router = useRouter()
    const redirectTo = useCallback(
        (path) => {
            router.push(path)
        }
    , [router])
    return redirectTo
}