import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from '../../db/token'
import { create as createUser } from '../../db/user'
import requestIp from 'request-ip'
import { ErrorApiData } from './types/ErrorApiData'

export type RegisterApiData = {
    status: "ok"
    token: string
} | ErrorApiData

export default async function registerApi (
    req: NextApiRequest,
    res: NextApiResponse<RegisterApiData>
    ) {
    const ip = requestIp.getClientIp(req)

    console.log(req.body)

    try {
        const user = await createUser({ ...req.body, registerIp: ip })
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
