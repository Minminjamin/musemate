import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    const { userId, name } = req.body;

    if (!session?.user) return;

    const id: string = session?.user?.id || "";

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        userId,
        name,
      },
    });

    res.status(200);
  } catch (err) {
    res.status(400).json(err);
  }
}
