import React, { ReactNode } from "react";
import S from "./UserProfile.module.scss";
import Image from "next/image";

interface Profile {
  icons: ReactNode;
  name?: string;
  img?: string;
}

const UserProfile = ({
  icons,
  name = "user Name",
  img = "https://res.cloudinary.com/musemate/image/upload/v1700721701/wupnnahnfrpclwutzxll.png",
}: Profile) => {
  return (
    <div className={S.profileContainer}>
      <div className={S.profileWrap}>
        <Image
          src={img}
          alt="유저 profile"
          width={30}
          height={30}
          className={S.img}
        />
        <span>{name}</span>
      </div>

      <div className={S.iconWrap}>{icons}</div>
    </div>
  );
};

export default UserProfile;
