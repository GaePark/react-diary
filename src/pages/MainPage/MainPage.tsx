import React from "react";
import * as S from "./MainPage.Styles";

const MainPage = () => {
  return (
    <S.Wrapper>
      <S.Fcontain>
        <S.Wrap>
          <S.Title>POST</S.Title>
          <div
            style={{
              width: "100%",
              height: "50%",
              padding: "5px",
            }}
          ></div>
        </S.Wrap>
        <S.Wrap>
          <S.Title>NEWS</S.Title>
        </S.Wrap>
      </S.Fcontain>
      <S.NewsWrap>
        <S.Title>DIARY</S.Title>
      </S.NewsWrap>
    </S.Wrapper>
  );
};

export default MainPage;
