import React from "react";
import S from "./Nav.module.scss";
import UserProfile from "@/components/atoms/UserProfile/UserProfile";
import Search from "@/components/atoms/Search/Search";
import { GoPersonFill } from "react-icons/go";
import { FaMessage } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import SimplePlaylist from "@/components/atoms/SimplePlaylist/SimplePlaylist";
import { useSession } from "next-auth/react";
import { LuLogIn } from "react-icons/lu";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className={S.navContainer}>
      <h2>MuseMate</h2>

      <section className={S.searchWrap}>
        {/* 팔로우 유저 기능 */}
        <Search />

        <section className={S.userWrap}>
          <UserProfile
            icons={
              <>
                <GoPersonFill className={S.firstIcon} />
                <FaMessage />
              </>
            }
          />
          <UserProfile icons={<GoPersonFill />} />
        </section>
      </section>

      <section className={S.playlistWrap}>
        {/* 내 플레이리스트 보기와 만들기, 퍼블리싱만 진행, 추후 개발 */}
        <SimplePlaylist />
      </section>

      {/* 나의 프로필자 */}
      <section className={S.profileWrap}>
        {session ? (
          <UserProfile
            icons={
              <>
                <IoIosSettings />
                <BiLogOut />
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
