import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from '../../db/token'
import { login } from '../../db/user'
import requestIp from 'request-ip'
import { ErrorApiData } from './types/ErrorApiData'

export type LoginApiData = {
    status: "ok"
    token: string
} | ErrorApiData

export default async function apiTestDataHandler(
    req: NextApiRequest,
    res: NextApiResponse<LoginApiData>
  ) {
    const ip = requestIp.getClientIp(req)

    try {
        const user = await login(req.body.email, req.body.password)

        const token = await getToken(user.id)
        res.status(200).json({
            status: "ok",
            token: token
        })
    } catch (err) {
        res.status(200).json({
            status: "error",
            error: String(err)
        })
    }
}
