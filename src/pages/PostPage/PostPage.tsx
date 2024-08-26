import React, { useEffect, useState } from "react";
import * as S from "./PostPage.Styles";
import { Link, useNavigate } from "react-router-dom";
import { PageWrapper } from "../../Styles";
import { get, limitToLast, query, ref } from "firebase/database";
import { db } from "../../firebase";

interface postDataTypes {
  content: string;
  number: string;
  title: string;
  today: string;
  uid: string;
  writer: string;
}

const PostPage = () => {
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState<postDataTypes[] | null>(null);
  useEffect(() => {
    try {
      get(query(ref(db, "posts"), limitToLast(10))).then((snapshot) => {
        if (snapshot.exists()) {
          setPostsData(snapshot.val());
        } else {
          console.log("No data available");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <PageWrapper>
      <S.Theme>POST</S.Theme>
      <div style={{ textAlign: "right" }}>
        <Link style={{ textDecoration: "none" }} to={"/post/write"}>
          <S.WriteBtn>작성하기</S.WriteBtn>
        </Link>
      </div>
      <table
        style={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          borderTop: "2px solid black",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#B1EBB5", height: "50px" }}>
            <td style={{ width: "70%" }}>제목</td>
            <td style={{ width: "15%" }}>글쓴이</td>
            <td style={{ width: "15%" }}>작성일</td>
          </tr>
        </thead>
        <tbody>
          {postsData &&
            Object.entries(postsData)
              .reverse()
              .map(([key, value]) => (
                <tr
                  key={key}
                  style={{ borderBottom: "1px solid #ccc", height: "50px" }}
                >
                  <td
                    onClick={(): void => navigate(`/post/${value.number}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {value.title}
                  </td>
                  <td>{value.writer}</td>
                  <td>{value.today}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <button onClick={() => console.log(postsData)}></button>
    </PageWrapper>
  );
};

export default PostPage;
