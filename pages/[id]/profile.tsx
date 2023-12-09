import React from "react";
import S from "@/styles/profile.module.scss";
import ProfilePage from "@/components/templates/ProfilePage/ProfilePage";
import { useUserData } from "@/hooks/useUserData";

const profile = () => {
  const { data } = useUserData();

  return (
    <section className={S.profileContainer}>
      <section className={S.profileWrap}>
        <ProfilePage user={data} btn={<button>프로필 수정</button>} />
      </section>
      <section className={S.sideWrap}></section>
    </section>
  );
};

export default profile;
