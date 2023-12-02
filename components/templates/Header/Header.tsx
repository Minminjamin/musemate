import React from "react";
import S from "./Header.module.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaMessage } from "react-icons/fa6";

const Header = ({ pageName }: { pageName: string }) => {
  return (
    <header className={S.headerContainer}>
      <h1>{pageName}</h1>

      <section className={S.menuWrap}>
        <AiFillPlusCircle size={24} />
        <FaMessage size={24} />
        <BiLogOut size={24} />
      </section>
    </header>
  );
};

export default Header;
