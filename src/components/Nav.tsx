import React, { useState } from "react";
import * as S from "./Nav.Styles";
import { Link, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";

const Nav = () => {
  const auth = getAuth(app);
  const location = useLocation();

  const navData = [
    { title: "홈", key: "/" },
    { title: "게시판", key: "/post" },
    { title: "뉴스", key: "/news" },
    { title: "일기장", key: "/diary" },
  ];

  const [modal, setModal] = useState<string>("none");

  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const onClickModal = () => {
    if (modal === "none") {
      setModal("block");
    } else {
      setModal("none");
    }
  };

  return (
    <S.Wrapper>
      <div></div>
      <S.Content>
        {navData.map((el) => (
          <Link key={el.key} style={{ textDecoration: "none" }} to={el.key}>
            <S.Title isAct={el.key === location.pathname}>{el.title}</S.Title>
          </Link>
        ))}
      </S.Content>
      <S.Profile>
        <S.Icon
          onClick={onClickModal}
          src={`${process.env.PUBLIC_URL}/images/avatar.png`}
        />
        <S.Modal style={{ display: modal }}>
          <li>정보수정</li>
          <li onClick={onClickSignOut}>로그아웃</li>
        </S.Modal>
      </S.Profile>
    </S.Wrapper>
  );
};

export default Nav;
