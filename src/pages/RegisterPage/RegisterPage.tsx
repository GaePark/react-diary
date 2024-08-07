import React from "react";
import * as S from "./RegisterPage.Styles";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <S.Wrapper>
      <S.Content>
        <S.Title>Register</S.Title>
        <S.Input type="text" placeholder="이름"></S.Input>
        <S.Input type="text" placeholder="아이디"></S.Input>
        <S.Input type="password" placeholder="비밀번호"></S.Input>
        <S.Input type="password" placeholder="비밀번호 확인"></S.Input>
        <S.Button>제 출</S.Button>
        <S.Change>
          <Link
            style={{
              color: "#aaa",
              fontSize: "0.88rem",
              textDecoration: "none",
            }}
            to="/login"
          >
            로그인
          </Link>
        </S.Change>
      </S.Content>
    </S.Wrapper>
  );
};

export default RegisterPage;
