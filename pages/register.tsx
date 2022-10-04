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
const pass2ErrorText = "２つのパスワードは同じではありません"
const incorrectPasswordErrorText = "メールアドレスとパスワードが一致しません"
const errorTextUserEmailAlreadyExists = "このメールはすでに登録されています"

const RegisterPage: React.FC = () => {
    const storeValue = useContext(store)

    const router = useRouter()

    const [email, setEmail] = useState<string>("")
    const [pass, setPass] = useState<string>("")
    const [pass2, setPass2] = useState<string>("")
    const [name, setName] = useState<string>("")

    const [errorText, setErrorText] = useState<string>("")

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const passChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value)
    }

    const pass2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass2(event.target.value)
    }

    const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const isEmailError = !Boolean(String(email).match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/))
    const isPassError = !Boolean(String(pass).match(/^[a-zA-Z0-9]{6,32}$/))
    const isPass2Error = pass !== pass2


    const goToLogin = () => router.push("/login")

    const register = async () => {
        const res = await axios(
            {
                method: 'post',
                url: '/api/register',
                data: {
                    email: email,
                    name: name,
                    password: pass
                }
            }
        )

        if (res.data?.error) {
            if (res.data?.error === "user_email_already_exists") {
                setErrorText(errorTextUserEmailAlreadyExists)
            } else {
                setErrorText(res.data?.error)
            }
        }

        if (res.data?.status === "ok" && res.data?.token) {
            console.log(res.data?.token)
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
                    <TextField id="account" type="email" label="メールアドレス" sx={{ width: "100%" }} inputProps={{
                        autoComplete: 'email'
                    }}
                        onChange={emailChange} value={email} error={isEmailError && email !== ""}
                        variant="filled" helperText={isEmailError && email !== "" ? emailErrorText : ""} />
                </Box>

                <Box sx={{ margin: "1rem", width: "100%" }}>
                    <TextField id="username" type="name" label="お名前" sx={{ width: "100%" }} inputProps={{
                        autoComplete: 'nickname'
                    }}
                        onChange={nameChange} value={name} error={false}
                        variant="filled" helperText={""} />
                </Box>

                <Box sx={{ margin: "1rem", width: "100%" }}>
                    <TextField id="password" type="password" label="パスワード" sx={{ width: "100%" }} inputProps={{
                        autoComplete: 'new-password'
                    }}
                        onChange={passChange} value={pass} error={isPassError && pass !== ""}
                        variant="filled" helperText={isPassError && pass !== "" ? passErrorText : ""} />
                </Box>

                <Box sx={{ margin: "1rem", width: "100%" }}>
                    <TextField id="password-again" type="password" label="パスワードを再入力してください" sx={{ width: "100%" }} inputProps={{
                        autoComplete: 'new-password'
                    }}
                        onChange={pass2Change} value={pass2} error={isPass2Error && pass2 !== ""}
                        variant="filled" helperText={isPass2Error && pass2 !== "" ? pass2ErrorText : ""} />
                </Box>

                <Typography >
                    すでにメンバーですか？<a style={{
                        textDecoration: "underline",
                        cursor: "pointer"
                    }} onClick={goToLogin}>ここを</a>クリックしてログインしてください。
                </Typography>

                <Typography color="error" >
                    {errorText}
                </Typography>

                <Box sx={{
                    margin: "3rem", justifyContent:
                        "center"
                    , alignItems: "center", display: "flex"
                }} >
                    <Button variant="contained" onClick={register} disabled={isEmailError || isPassError || isPass2Error || name === ""}
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

export default RegisterPage