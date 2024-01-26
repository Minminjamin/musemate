import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET_KEY,
  secure: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    const { userId, name } = req.body;

    if (!session?.user) return;

    const id: string = session?.user?.id || "";

    const file: any = await new Promise((resolve, reject) => {
      const form = formidable();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
      });
      form.on("file", (formName, file) => {
        resolve(file);
      });
    });

    const data = await cloudinary.uploader.upload(file.filepath);

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        profileImg: data.secure_url,
      },
    });

    res.status(200);
  } catch (err) {
    res.status(400).json(err);
  }
}
