import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import S from "./ProfileEditor.module.scss";
import { getSession } from "next-auth/react";

const ProfileEditor = ({ user }): any => {
  const idRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<File | null>();

  useEffect(() => {
    console.log(imgRef.current?.name || "없다");
    console.log("파일", imgRef.current);
    console.log(getSession());
  }, [imgRef]);

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    imgRef.current = null;
    if (e.target.files) imgRef.current = e.target.files[0];
  };

  const onChangeProfile = async () => {
    try {
      console.log("실행함");
      await fetch("api/profile/updateInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: idRef.current?.value,
          name: nameRef.current?.value,
        }),
      });
      if (imgRef.current) {
        const formData = new FormData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={S.profileEditorContainer} onSubmit={onChangeProfile}>
      <div className={S.imgWrap}>
        <Image
          src={user?.profileImg}
          alt="나의 프로필 이미지"
          width={50}
          height={50}
        />

        <input
          type="file"
          accept="image/jpeg,image/gif,image/png"
          onChange={onChangeImg}
        />
      </div>

      <div className={S.editorWrap}>
        <label>ID</label>
        <input type="text" defaultValue={user?.userId} ref={idRef} />
        <label>이름</label>
        <input type="text" defaultValue={user?.name} ref={nameRef} />

        <button type="submit">변경</button>
      </div>
    </form>
  );
};

export default ProfileEditor;
