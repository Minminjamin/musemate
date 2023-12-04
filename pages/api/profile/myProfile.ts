import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });

      if (!session?.user) return;

      const email: string = session?.user?.email || "";

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          name: true,
          profileImg: true,
          userId: true,
          follower: true,
          following: true,
          playlists: true,
        },
      });

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}
