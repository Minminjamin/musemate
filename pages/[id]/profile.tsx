import React, { useEffect, useState } from "react";
import S from "@/styles/profile.module.scss";
import ProfilePage from "@/components/templates/ProfilePage/ProfilePage";
import { useUserData } from "@/hooks/useUserData";
import ProfileEditor from "@/components/templates/ProfileEditor/ProfileEditor";

const profile = () => {
  const { data } = useUserData();

  const [editMyProfile, setEditMyProfile] = useState<boolean>(true);

  // useEffect(() => {
  //   return () => {
  //     setEditMyProfile(false);
  //   };
  // });

  return (
    <section className={S.profileContainer}>
      <section className={S.profileWrap}>
        <ProfilePage
          user={data}
          btn={
            <button onClick={() => setEditMyProfile(true)}>프로필 수정</button>
          }
        />
      </section>
      <section className={S.sideWrap}>
        {editMyProfile && <ProfileEditor user={data} />}
      </section>
    </section>
  );
};

export default profile;
