import React, { useEffect } from "react";
import * as S from "./PostPage.Styles";
import { Link } from "react-router-dom";
import { PageWrapper } from "../../Styles";

const PostPage = () => {
  useEffect(() => {}, []);
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
          textAlign: "center",
          borderTop: "2px solid black",
          borderCollapse: "collapse",
        }}
      >
        <tr style={{ backgroundColor: "#B1EBB5" }}>
          <td>번호</td>
          <td>제목</td>
          <td>글쓴이</td>
          <td>작성일</td>
        </tr>
      </table>
    </PageWrapper>
  );
};

export default PostPage;
