import React from "react";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import S from "./SimpleAddPlaylist.module.scss";

const SimpleAddPlaylist = () => {
  return (
    <div className={S.simpleAddPlaylistContainer}>
      <MdOutlinePlaylistPlay width={30} height={30} />
      <span>플레이리스트 추가하기</span>
    </div>
  );
};

export default SimpleAddPlaylist;
