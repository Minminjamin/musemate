import React, { useEffect } from "react";
import S from "./Nav.module.scss";
import UserProfile from "@/components/atoms/UserProfile/UserProfile";
import Search from "@/components/atoms/Search/Search";
import { GoPersonFill } from "react-icons/go";
import { FaMessage } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import SimplePlaylist from "@/components/atoms/SimplePlaylist/SimplePlaylist";
import { signOut, useSession } from "next-auth/react";
import { LuLogIn } from "react-icons/lu";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/router";

const Nav = () => {
  const { data: session } = useSession();

  const { data: user } = useUserData();

  const router = useRouter();

  return (
    <nav className={S.navContainer}>
      <section className={S.top}>
        <h1 onClick={() => router.push("/")}>MuseMate</h1>
      </section>

      <section className={S.infoWrap}>
        <article className={S.searchWrap}>
          {/* 팔로우 유저 기능 */}
          <Search />

          <div className={S.userWrap}>
            <UserProfile
              icons={
                <div className={S.twoIconWrap}>
                  <GoPersonFill className={`${S.firstIcon} ${S.icon}`} />
                  <FaMessage />
                </div>
              }
            />
            <UserProfile icons={<GoPersonFill className={S.icon} />} />
          </div>
        </article>
        <article className={S.playlistWrap}>
          {/* 내 플레이리스트 보기와 만들기, 퍼블리싱만 진행, 추후 개발 */}
          <SimplePlaylist />
        </article>
      </section>

      {/* 나의 프로필자 */}
      <section className={S.profileWrap}>
        {session ? (
          <UserProfile
            name={user?.userId as string}
            img={user?.profileImg}
            icons={
              <>
                <IoIosSettings className={S.icon} />
                <BiLogOut className={S.icon} onClick={() => signOut()} />
              </>
            }
          />
        ) : (
          <UserProfile name="로그인 해주세요." icons={<LuLogIn />} />
        )}
      </section>
    </nav>
  );
};

export default Nav;
