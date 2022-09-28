// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface ApiTestData {
  status: "ok";
}

export default function apiTestDataHandler(
  req: NextApiRequest,
  res: NextApiResponse<ApiTestData>
) {
  res.status(200).json({ status: "ok" });
}
