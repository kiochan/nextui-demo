import { NextApiRequest, NextApiResponse } from 'next'
import { getUser } from '../../db/token'
import { get as getUserInfo } from '../../db/user'
import requestIp from 'request-ip'
import { ErrorApiData } from './types/ErrorApiData'

export type UserInfoApiData = {
    status: "ok"
    data: {
        id: number
        email: string
        name: string
    }
} | ErrorApiData

export default async function userInfoApi (
    req: NextApiRequest,
    res: NextApiResponse<UserInfoApiData>
) {
    const ip = requestIp.getClientIp(req)

    try {
        const id = await getUser(req.body.token)
        const userInfo = await getUserInfo(id)
        res.status(200).json({
            status: "ok",
            data: {
                id: userInfo.id,
                email: userInfo.email,
                name: userInfo.name
            }
        })

    } catch (err) {
        res.status(200).json({
            status: "error",
            error: String(err)
        })
    }
}
