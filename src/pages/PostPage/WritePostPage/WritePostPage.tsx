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
import { useForm } from "react-hook-form";

interface FormTypes {
  title: string;
  content: string;
}

const WritePostPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: RootState) => state.user);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>();

  const onClickSubmit = async (data: FormTypes): Promise<void> => {
    try {
      setLoading(true);
      const dbRef = ref(db);
      let postsNum: number = 0;
      console.log(data.content, data.title);

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
        title: data.title,
        writer: currentUser.displayName,
        uid: currentUser.uid,
        content: data.content,
        today: date,
      });

      await set(postsCountRef, {
        num: postsNum,
      });
      setLoading(false);

      navigate(`/post/${newPostRef.key}`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageWrapper>
      <S.Theme>POST</S.Theme>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        <div>
          <S.Text>제목</S.Text>
          <S.Title
            type="text"
            {...register("title", { required: true })}
          ></S.Title>
          {errors.title && errors.title.type === "required" && (
            <S.errorTag>제목을 입력해주세요!</S.errorTag>
          )}
        </div>
        <div>
          <S.Text>내용</S.Text>
          <S.Content {...register("content", { required: true })}></S.Content>
          {errors.content && errors.content.type === "required" && (
            <S.errorTag>내용을 입력해주세요!</S.errorTag>
          )}
        </div>

        <div style={{ textAlign: "right" }}>
          <S.Submit
            type="submit"
            disabled={loading}
            value={"등록하기"}
          ></S.Submit>
        </div>
      </form>
    </PageWrapper>
  );
};

export default WritePostPage;
