import React, { useEffect, useState } from "react";
import * as S from "./MainPage.Styles";
import { PageWrapper } from "../../Styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { get, limitToLast, orderByKey, query, ref } from "firebase/database";
import { db } from "../../firebase";
import { reDate } from "../../api/Date";

interface DataTypes {
  content: string;
  number: string;
  title: string;
  today: number;
  uid: string;
  writer: string;
}

const MainPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [postData, setPostData] = useState<DataTypes[] | null>(null);
  const [diaryData, setDiaryData] = useState<DataTypes[] | null>(null);

  useEffect(() => {
    try {
      get(
        query(ref(db, `diary/${currentUser.uid}`), orderByKey(), limitToLast(7))
      ).then((snapshot) => {
        if (snapshot.exists()) {
          setDiaryData(snapshot.val());
          console.log(snapshot.val());
        } else {
          console.log("데이터가 없습니다.");
        }
      });

      get(query(ref(db, `posts`), orderByKey(), limitToLast(7))).then(
        (snapshot) => {
          if (snapshot.exists()) {
            setPostData(snapshot.val());
          } else {
            console.log("데이터가 없습니다.");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <PageWrapper>
      {postData && diaryData ? (
        <>
          <S.Fcontain>
            <S.Wrap>
              <S.Title>POST</S.Title>
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
              <div>
                {Object.entries(postData)
                  .reverse()
                  .map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        borderBottom: "1px solid #ccc",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        onClick={(): void => navigate(`/post/${value.number}`)}
                        style={{ cursor: "pointer", width: "70%" }}
                      >
                        {value.title}
                      </div>
                      <div style={{ width: "15%" }}>{value.writer}</div>
                      <div style={{ width: "15%" }}>{reDate(value.today)}</div>
                    </div>
                  ))}
              </div>
              <div
                style={{
                  color: "#d6d6d6",
                  textAlign: "right",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
                onClick={() => navigate("/post")}
              >
                더보기
              </div>
            </S.Wrap>
            <S.Wrap>
              <S.Title>DIARY</S.Title>
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
              <div>
                {Object.entries(diaryData)
                  .reverse()
                  .map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        borderBottom: "1px solid #ccc",
                        width: "100%",
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
              <div
                style={{
                  color: "#d6d6d6",
                  textAlign: "right",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
                onClick={() => navigate("/diary")}
              >
                더보기
              </div>
            </S.Wrap>
          </S.Fcontain>
          <S.NewsWrap>
            <S.Title>NEWS</S.Title>
          </S.NewsWrap>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </PageWrapper>
  );
};

export default MainPage;
