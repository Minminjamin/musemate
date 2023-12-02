import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { ObjectId as MongoObjectID } from "mongodb";
import { cloudinary } from "@/libs/cloudinary";
import { randomId as userRandomId } from "@/utils/RandomId";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (profile) {
        user.name = profile.name || user.name;
        user.email = profile.email || user.email;
      }

      // 고유한 값으로 단일 사용자 레코드를 검색
      try {
        let db_user = await prisma.user.findUnique({
          where: { email: user.email || "" },
        });

        // 새로운 User 레코드를 생성하는 쿼리 작성
        if (!db_user) {
          const randomIdObject = new MongoObjectID();
          const randomId = randomIdObject.toString();

          const userId = userRandomId();

          db_user = await prisma.user.create({
            data: {
              id: randomId,
              name: user.name!,
              email: user.email!,
              profileImg: "",
              userId: userId,
            },
          });

          try {
            const img = "public/user-2935527_1280.png";
            const imgUpload = await cloudinary.uploader.upload(img);
            const imgUrl = imgUpload.secure_url;

            db_user = await prisma.user.update({
              where: { email: user.email || "" },
              data: { profileImg: imgUrl },
            });
          } catch (error) {
            console.log("이미지 업로드 및 저장 에러:", error);
          }
        }

        user.id = db_user.id;

        return true;
      } catch (error) {
        console.log("로그인 도중 에러가 발생했습니다.", error);

        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        const session_user: any = session.user;
        session_user.id = token.id as string;
      }

      return session;
    },
  },

  secret: process.env.NEXT_PUBLICK_NEXT_AUTH_SECRET,
};

export default NextAuth(authOptions);
