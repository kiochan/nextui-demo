import axios from "axios"
import { useEffect, useRef, useState } from "react"
import useStore from "./useStore"

export interface UserInfo {
    name?: string
    id?: string
    email?: string
}

export default function useUserInfo () {

    const componentMounted = useRef(true);
    
    const [store] = useStore()
    const token = store?.token

    const [userInfo, setUserInfo] = useState<UserInfo>({})

    useEffect(() => {
        (async () => {
            console.log("token", token)
            try {
                const userInfo = await axios({
                    method: "post",
                    url: "/api/userInfo",
                    data: { token }
                })
                console.log("pull user info", {
                    id: userInfo.data?.data?.id,
                    name: userInfo.data?.data?.name,
                    email: userInfo.data?.data?.email
                })
                setUserInfo({
                    id: userInfo.data?.data?.id,
                    name: userInfo.data?.data?.name,
                    email: userInfo.data?.data?.email
                })
            } catch (err) {
                console.error(err)
            }
        })()
        return () => {
            componentMounted.current = false;
        }
    }, [token])

    return userInfo
}