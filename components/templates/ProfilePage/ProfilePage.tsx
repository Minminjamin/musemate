import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import SimpleAddPlaylist from "@/components/atoms/SimpleAddPlaylist/SimpleAddPlaylist";
import SimplePlaylist from "@/components/atoms/SimplePlaylist/SimplePlaylist";
import S from "./ProfilePage.module.scss";

const ProfilePage = ({ user, btn }: { user: any; btn: ReactNode }) => {
  const [myPage, setMyPage] = useState<boolean>(false);
  const { data } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (router.asPath.split("/")?.[1] === data?.id) setMyPage(true);
    console.log(myPage);
    return () => {
      setMyPage(false);
    };
  }, [myPage, setMyPage]);

  return (
    <section className={S.profilePageContainer}>
      <article className={S.imgWrap}>
        <Image
          className={S.img}
          src={user?.profileImg}
          alt="유저 profile"
          width={80}
          height={80}
        />

        {btn}
      </article>

      <article className={S.userInfoWrap}>
        <span className={S.userInfo}>{user?.name}</span>
        <span className={S.userInfo}>@{user?.userId}</span>

        <div className={S.followWrap}>
          <span>{}팔로잉 중</span>
          <span>{}팔로우 중</span>
        </div>
      </article>

      <article>
        {myPage && <SimpleAddPlaylist />}
        <SimplePlaylist />
        <SimplePlaylist />
        <SimplePlaylist />
        <SimplePlaylist />
        <SimplePlaylist />
      </article>
    </section>
  );
};

export default ProfilePage;
