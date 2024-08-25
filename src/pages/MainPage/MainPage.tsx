import React, { useEffect } from "react";
import * as S from "./MainPage.Styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { PageWrapper } from "../../Styles";

const MainPage = () => {
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.history.forward();
      }

      return () => {
        unsubscribe();
      };
    });
  }, []);
  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default MainPage;
