import React from "react";
import * as S from "./WritePostPage.Styles";

const WritePostPage = () => {
  return (
    <S.Wrapper>
      <S.Theme>POST</S.Theme>
      <div>
        <S.Text>제목</S.Text>
        <S.Title></S.Title>
      </div>
      <div>
        <S.Text>내용</S.Text>
        <S.Content></S.Content>
      </div>
      <div style={{ textAlign: "right" }}>
        <S.Submit>등록하기</S.Submit>
      </div>
    </S.Wrapper>
  );
};

export default WritePostPage;
