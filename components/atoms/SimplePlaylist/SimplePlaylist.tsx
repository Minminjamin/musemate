import React from "react";
import S from "./SimplePlaylist.module.scss";
import { IoMdHeadset } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";

const SimplePlaylist = ({ name = "playlist" }: { name: string }) => {
  return (
    <div className={S.simplePlaylistContainer}>
      <div className={S.playlistWrap}>
        <IoMdHeadset size={30} className={S.headsetIcon} />
        <span>{name}</span>
      </div>

      <div className={S.playlistIconWrap}>
        <FiMoreHorizontal className={S.icon} />
      </div>
    </div>
  );
};

export default SimplePlaylist;
