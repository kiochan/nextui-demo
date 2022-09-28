// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface ApiTestData {
  status: 'ok'
  data: {
    now: number
  }
}

function wait(sec: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, sec * 1000.0)
  })
}

export default async function apiTestDataHandler(
  req: NextApiRequest,
  res: NextApiResponse<ApiTestData>
) {
  await wait(0.3)
  if (Math.random() > 0.25) {
    return res.status(200).json({ 
      status: 'ok',
      data: {
        now: Date.now()
      }
    })
  } else {
    return res.status(500).end()
  }
}
