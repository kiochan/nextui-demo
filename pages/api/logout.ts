import { NextApiRequest, NextApiResponse } from 'next'
import { logout } from '../../db/token'
import { ErrorApiData } from './types/ErrorApiData'

export type LogoutApiData = {
    status: "ok"
} | ErrorApiData


export default async function logoutApi(
    req: NextApiRequest,
    res: NextApiResponse<LogoutApiData>
  )  {
    try {
        await logout(req.body.token)
        res.status(200).json({
            status: "ok",
        })
    } catch (err) {
        res.status(200).json({
            status: "error",
            error: String(err)
        })
    }
}
