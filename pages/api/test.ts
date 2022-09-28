// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface ApiTestData {
  status: string;
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
  await wait(1)
  res.status(200).json({ status: `ok (timestamp = ${Date.now()})` })
}
