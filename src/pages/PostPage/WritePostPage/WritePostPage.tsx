import React, { useState } from "react";
import * as S from "./WritePostPage.Styles";
import { child, get, push, ref, set } from "firebase/database";
import { db } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { nowDate } from "../../../api/Date";
import { setPostsCount } from "../../../store/postsCountSlice";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../../../Styles";

const WritePostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: RootState) => state.user);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const onClickSubmit = async (): Promise<void> => {
    setLoading(true);
    const dbRef = ref(db);
    let postsNum: number = 0;

    const postsRef = ref(db, "posts");
    const postsCountRef = ref(db, "postsCount");
    const newPostRef = push(postsRef);
    const date = nowDate;

    await get(child(dbRef, "postsCount/num"))
      .then((snapShot) => {
        if (snapShot.exists()) {
          postsNum = snapShot.val();
          postsNum++;
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    dispatch(setPostsCount(postsNum + 1));

    await set(newPostRef, {
      number: newPostRef.key,
      title,
      writer: currentUser.displayName,
      uid: currentUser.uid,
      content,
      today: date,
    });

    await set(postsCountRef, {
      num: postsNum,
    });
    setLoading(false);

    navigate(`/post/${newPostRef.key}`);
    console.log(postsNum);
  };
  return (
    <PageWrapper>
      <S.Theme>POST</S.Theme>
      <div>
        <S.Text>제목</S.Text>
        <S.Title type="text" value={title} onChange={onChangeTitle}></S.Title>
      </div>
      <div>
        <S.Text>내용</S.Text>
        <S.Content onChange={onChangeContent}></S.Content>
      </div>
      <div style={{ textAlign: "right" }}>
        <S.Submit disabled={loading} onClick={onClickSubmit}>
          등록하기
        </S.Submit>
      </div>
    </PageWrapper>
  );
};

export default WritePostPage;
