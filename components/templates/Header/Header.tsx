import React from "react";
import S from "./Header.module.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaMessage } from "react-icons/fa6";
import { signOut } from "next-auth/react";

const Header = ({ pageName }: { pageName: string }) => {
  return (
    <header className={S.headerContainer}>
      <h1>{pageName} Page</h1>

      <section className={S.menuWrap}>
        <AiFillPlusCircle size={24} className={`${S.messageIcon} ${S.icon}`} />
        <FaMessage size={24} className={S.icon} />
        <BiLogOut size={24} className={S.icon} onClick={() => signOut()} />
      </section>
    </header>
  );
};

export default Header;
