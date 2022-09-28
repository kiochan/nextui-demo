import type { NextApiRequest, NextApiResponse } from "next";

import { Server } from "socket.io";

// see https://blog.logrocket.com/implementing-websocket-communication-next-js/

export default function SocketHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (res.socket?.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);

    res.socket.server.io = io;
  }
  res.end();
}
