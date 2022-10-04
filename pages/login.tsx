import AppContainer from "../components/view/AppContainer"
import words from "../config/words"

import homeHeroImage from "../images/hero-home.jpg"

import { Box, TextField, Button, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import { useRouter } from "next/router"

import axios from "axios"
import store from "../store"

const emailErrorText = "正しいメールアドレスを入力してください"
const passErrorText = "パスワードは、6〜32個のラテン文字または数字のみで構成できます"
const incorrectPasswordErrorText = "メールアドレスとパスワードが一致しません"

const LoginPage: React.FC = () => {
    const storeValue = useContext(store)

    const router = useRouter()

    const [email, setEmail] = useState<string>("")
    const [pass, setPass] = useState<string>("")

    const [errorText, setErrorText] = useState<string>("")

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const passChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value)
    }

    const isEmailError = !Boolean(String(email).match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/))
    const isPassError = !Boolean(String(pass).match(/^[a-zA-Z0-9]{6,32}$/))



    const goToRegister = () => router.push("/register")

    const login = async () => {
        const res = await axios(
            {
                method: 'post',
                url: '/api/login',
                data: {
                    email: email,
                    password: pass
                }
            }
        )

        if (res.data?.error) {
            setErrorText(incorrectPasswordErrorText)
        }

        if (res.data?.status === "ok" && res.data?.token) {
            storeValue.setData({ ...storeValue.data, token: res.data.token })
            setTimeout(() =>
                router.push(storeValue?.data?.redirect || "/")
                , 1000)
        }
    }

    if (storeValue?.data?.token) {
        router.push("/redirect")
    }

    return <AppContainer title={words.site.titles.login} shortBanner heroImages={[{ image: homeHeroImage }]}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{
                width: {
                    xs: 300,
                    sm: 400,
                    md: 500,
                },
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
            }}>

                <Box sx={{ margin: "1rem", width: "100%" }}>
                    <TextField id="account" type="email" label="メールアドレス" sx={{ width: "100%" }}
                        onChange={emailChange} value={email} error={isEmailError && email !== ""}
                        variant="filled" helperText={isEmailError && email !== "" ? emailErrorText : ""}
                        inputProps={{
                            autoComplete: 'email'
                        }}
                    />

                </Box>

                <Box sx={{ margin: "1rem", width: "100%" }}>
                    <TextField id="password" type="password" label="パスワード" sx={{ width: "100%" }}
                        onChange={passChange} value={pass} error={isPassError && pass !== ""}
                        variant="filled" helperText={isPassError && pass !== "" ? passErrorText : ""}
                        inputProps={{
                            autoComplete: 'password-current'
                        }}
                    />
                </Box>

                <Typography color="error" >
                    {errorText}
                </Typography>

                <Box sx={{
                    margin: "3rem", justifyContent:
                        "center"
                    , alignItems: "center", display: "flex"
                }} >
                    <Button variant="contained" disabled={isEmailError || isPassError} onClick={login}
                        sx={{
                            width: "10rem",
                            margin: "1rem"
                        }}
                    >
                        ログイン
                    </Button>
                    <Button variant="outlined" onClick={goToRegister}
                        sx={{
                            width: "10rem",
                            margin: "1rem"
                        }}
                    >
                        登録
                    </Button>
                </Box>

            </Box>
        </Box >
    </AppContainer >
}

export default LoginPage