import React, { useEffect, useState } from "react";
import * as S from "./PostPage.Styles";
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

interface postDataTypes {
  content: string;
  number: string;
  title: string;
  today: number;
  uid: string;
  writer: string;
}

const PostPage = () => {
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState<postDataTypes[] | null>(null);
  const [lastVisibleKey, setLastVisibleKey] = useState<string | null>(null);
  const [firstVisibleKey, setFirstVisibleKey] = useState<string | null>(null);
  useEffect(() => {
    try {
      get(query(ref(db, "posts"), orderByKey(), limitToLast(10))).then(
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const keys = Object.keys(data);
            setPostsData(snapshot.val());
            if (keys.length > 0) {
              setLastVisibleKey(keys[0]);
              setFirstVisibleKey(keys[keys.length - 1]);
            }
          } else {
            console.log("데이터가 없습니다.");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickNext = () => {
    try {
      get(
        query(
          ref(db, "posts"),
          orderByKey(),
          endBefore(lastVisibleKey),
          limitToLast(10)
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const keys = Object.keys(data);

          setPostsData(snapshot.val());
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
          ref(db, "posts"),
          orderByKey(),
          startAfter(firstVisibleKey),
          limitToFirst(10)
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const keys = Object.keys(data);

          setPostsData(snapshot.val());
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
      <S.Theme>POST</S.Theme>
      <div style={{ textAlign: "right" }}>
        <Link style={{ textDecoration: "none" }} to={"/post/write"}>
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
            backgroundColor: "#f7f7f7",
            height: "50px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
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
          {postsData &&
            Object.entries(postsData)
              .reverse()
              .map(([key, value]) => (
                <S.Post key={key}>
                  <div
                    onClick={(): void => navigate(`/post/${value.number}`)}
                    style={{
                      cursor: "pointer",
                      width: "70%",
                      textAlign: "left",
                      paddingLeft: "20px",
                      height: "100%",
                      lineHeight: "50px",
                    }}
                  >
                    {value.title}
                  </div>
                  <div style={{ width: "15%" }}>{value.writer}</div>
                  <div style={{ width: "15%" }}>{reDate(value.today)}</div>
                </S.Post>
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

export default PostPage;
