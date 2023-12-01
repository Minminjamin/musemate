import React, { ReactNode } from "react";
import S from "./UserProfile.module.scss";
import Image from "next/image";

const UserProfile = ({ icons }: { icons: ReactNode }) => {
  return (
    <article className={S.profileContainer}>
      <div className={S.profileWrap}>
        <Image
          src="https://res.cloudinary.com/musemate/image/upload/v1700721701/wupnnahnfrpclwutzxll.png"
          alt="유저 profile"
          width={30}
          height={30}
          className={S.img}
        />
        <span>User Name</span>
      </div>

      <div className={S.iconWrap}>{icons}</div>
    </article>
  );
};

export default UserProfile;