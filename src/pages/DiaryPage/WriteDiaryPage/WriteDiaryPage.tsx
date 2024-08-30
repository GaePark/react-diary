import React, { useState } from "react";
import * as S from "./WriteDiaryPage.Styles";
import { push, ref, set } from "firebase/database";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { timeStamp } from "../../../api/Date";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../../../Styles";
import { useForm } from "react-hook-form";

interface FormTypes {
  title: string;
  content: string;
}

const WriteDiaryPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

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

      const diaryRef = ref(db, `diary/${currentUser.uid}`);
      const newDiaryRef = push(diaryRef);

      await set(newDiaryRef, {
        number: newDiaryRef.key,
        title: data.title,
        writer: currentUser.displayName,
        uid: currentUser.uid,
        content: data.content,
        today: timeStamp,
      });

      setLoading(false);

      navigate(`/diary/${newDiaryRef.key}`);
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
      <S.Theme>DIARY</S.Theme>
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

export default WriteDiaryPage;
