import React, { useEffect, useState } from "react";
import * as S from "./DiaryPage.Styles";
import { Link, useNavigate } from "react-router-dom";
import { PageWrapper } from "../../Styles";
import {
  endBefore,
  get,
  limitToFirst,
  limitToLast,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import { db } from "../../firebase";
import { reDate } from "../../api/Date";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface postDataTypes {
  content: string;
  number: string;
  title: string;
  today: number;
  uid: string;
  writer: string;
}

const DiaryPage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [diaryData, setDiaryData] = useState<postDataTypes[] | null>(null);
  const [lastVisibleKey, setLastVisibleKey] = useState<string | null>(null);
  const [firstVisibleKey, setFirstVisibleKey] = useState<string | null>(null);
  useEffect(() => {
    try {
      get(
        query(
          ref(db, `diary/${currentUser.uid}`),
          orderByKey(),
          limitToLast(10)
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const keys = Object.keys(data);
          setDiaryData(snapshot.val());
          if (keys.length > 0) {
            setLastVisibleKey(keys[0]);
            setFirstVisibleKey(keys[keys.length - 1]);
          }
          console.log(snapshot.val());
        } else {
          console.log("데이터가 없습니다.");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickNext = () => {
    try {
      get(
        query(
          ref(db, `diary/${currentUser.uid}`),
          orderByKey(),
          endBefore(lastVisibleKey),
          limitToLast(10)
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const keys = Object.keys(data);
          console.log(snapshot.val());
          console.log(keys[keys.length - 1]);

          setDiaryData(snapshot.val());
          if (keys.length > 0) {
            setLastVisibleKey(keys[0]);
            setFirstVisibleKey(keys[keys.length - 1]);
          }
        } else {
          console.log("데이터가 없습니다.");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickPrev = () => {
    try {
      get(
        query(
          ref(db, `diary/${currentUser.uid}`),
          orderByKey(),
          startAfter(firstVisibleKey),
          limitToFirst(10)
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const keys = Object.keys(data);
          console.log(data);
          console.log(firstVisibleKey);

          setDiaryData(snapshot.val());
          if (keys.length > 0) {
            setLastVisibleKey(keys[0]);
            setFirstVisibleKey(keys[keys.length - 1]);
          }
        } else {
          console.log("데이터가 없습니다.");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PageWrapper>
      <S.Theme>DIARY</S.Theme>
      <div style={{ textAlign: "right" }}>
        <Link style={{ textDecoration: "none" }} to={"/diary/write"}>
          <S.WriteBtn>작성하기</S.WriteBtn>
        </Link>
      </div>
      <div
        style={{
          width: "100%",
          height: "560px",
          textAlign: "center",
          borderTop: "2px solid black",
        }}
      >
        <div
          style={{
            backgroundColor: "#B1EBB5",
            height: "50px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "70%" }}>제목</div>
          <div style={{ width: "15%" }}>글쓴이</div>
          <div style={{ width: "15%" }}>작성일</div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {diaryData &&
            Object.entries(diaryData)
              .reverse()
              .map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    borderBottom: "1px solid #ccc",
                    width: "100%",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    onClick={(): void => navigate(`/diary/${value.number}`)}
                    style={{ cursor: "pointer", width: "70%" }}
                  >
                    {value.title}
                  </div>
                  <div style={{ width: "15%" }}>{value.writer}</div>
                  <div style={{ width: "15%" }}>{reDate(value.today)}</div>
                </div>
              ))}
        </div>
      </div>
      <div style={{ textAlign: "right", marginBottom: "30px" }}>
        <S.PageBtn onClick={onClickPrev}>Prev</S.PageBtn>
        <S.PageBtn onClick={onClickNext}>Next</S.PageBtn>
      </div>
    </PageWrapper>
  );
};

export default DiaryPage;
