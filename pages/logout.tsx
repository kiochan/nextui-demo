import { useRouter } from "next/router"
import AppContainer from "../components/view/AppContainer"
import words from "../config/words"
import useStore from '../components/hooks/useStore'
import { useEffect, useState } from "react"


const delta = 800
let startTimer = delta * 3

const LogoutPage: React.FC = () => {
    const router = useRouter()
    const [store, setStore] = useStore()
    const [btnTxt, setBtnTxt] = useState<string>(`残り${startTimer / delta}秒`)

    const redirect = store?.redirect || "/"

    if (store?.token) {
        setStore({ ...store, token: null })
    }

    useEffect(() => {
        let i = startTimer
        const d = delta
        const timer = setInterval(() => {
            setBtnTxt(`残り${Math.max(i / d, 0)}秒`)
            if (i <= 0) {
                if (redirect && redirect !== router.pathname) {
                    router.push(redirect)
                } else {
                    router.push("/")
                }
            }
            i -= d
        }, d)
        return () => clearInterval(timer)
    }, [])


    return <AppContainer
        title={words.site.titles.logout}
        subtitle="logout in progress" buttonLink={redirect}
        buttonText={btnTxt} displayHero>
    </AppContainer>
}

export default LogoutPage