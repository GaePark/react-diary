import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../../Styles";
import * as S from "./DetailPostPage.Styles";
import { child, get, ref } from "firebase/database";
import { db } from "../../../firebase";
import { useLocation } from "react-router-dom";

const DetailPostPage = () => {
  const [postData, setPostData] = useState({
    content: "",
    number: "",
    title: "",
    today: "",
    uid: "",
    writer: "",
  });
  const location = useLocation();
  const locationSplit = location.pathname.split("/");
  const locationLength = locationSplit.length;
  const postID = locationSplit[locationLength - 1];
  const dbRef = ref(db);
  useEffect(() => {
    get(child(dbRef, `posts/${postID}`)).then((snapShot) => {
      if (snapShot.exists()) {
        const data = snapShot.val();
        setPostData(data);
      } else {
        console.log("No data available");
      }
    });
  }, []);

  return (
    <PageWrapper>
      <S.Header>
        <S.HeaderTitle>{postData.title}</S.HeaderTitle>
        <p style={{ fontSize: "1rem", color: "#d3d3d3", fontWeight: "400" }}>
          작성자:<S.HeaderWriter>{postData.writer}</S.HeaderWriter>
        </p>
        <S.HeaderTime>{postData.today}</S.HeaderTime>
      </S.Header>
      <S.Content>{postData.content}</S.Content>
    </PageWrapper>
  );
};

export default DetailPostPage;
