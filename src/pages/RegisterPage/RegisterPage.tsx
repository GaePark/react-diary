import React, { useRef, useState } from "react";
import * as S from "./RegisterPage.Styles";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import app, { db } from "../../firebase";
import { ref as refDB, set } from "firebase/database";

interface FormTypes {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const RegisterPage = () => {
  const auth = getAuth(app);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorFromSubmit, setErrorFromSubmit] = useState<string>("");

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const onSubmit = async (data: FormTypes): Promise<void> => {
    try {
      setLoading(true);
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (auth.currentUser !== null) {
        await updateProfile(auth.currentUser, {
          displayName: data.name,
        });
      }
      set(refDB(db, `users/${createdUser.user.uid}`), {
        name: createdUser.user.displayName,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrorFromSubmit("이미 존재하는 이메일입니다.");
        } else {
          setErrorFromSubmit(error.message);
        }
        setTimeout(() => {
          setErrorFromSubmit("");
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <S.Wrapper>
      <S.Content>
        <S.Title>Register</S.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.Input
            type="text"
            placeholder="이름"
            {...register("name", { required: true, maxLength: 10 })}
          />
          {errors.name && errors.name.type === "required" && (
            <S.errorTag>이름을 입력해주세요.</S.errorTag>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <S.errorTag>이름은 최대 10글자 입니다.</S.errorTag>
          )}
          <S.Input
            type="email"
            placeholder="이메일"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && errors.email.type === "required" && (
            <S.errorTag>이메일을 입력해주세요.</S.errorTag>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <S.errorTag>@가 포함되어 있지 않았습니다.</S.errorTag>
          )}
          <S.Input
            type="password"
            placeholder="비밀번호"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 24,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <S.errorTag>비밀번호를 입력해주세요.</S.errorTag>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <S.errorTag>비밀번호는 최대 24글자입니다.</S.errorTag>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <S.errorTag>비밀번호는 최소 6글자입니다.</S.errorTag>
          )}
          <S.Input
            type="password"
            placeholder="비밀번호 확인"
            {...register("password_confirm", {
              required: true,
              validate: (value: string) => value === passwordRef.current,
            })}
          />
          {errors.password_confirm &&
            errors.password_confirm.type === "required" && (
              <S.errorTag>비밀번호 확인을 입력해주세요</S.errorTag>
            )}
          {errors.password_confirm &&
            errors.password_confirm.type === "validate" && (
              <S.errorTag>비밀번호가 일치하지 않습니다.</S.errorTag>
            )}

          {errorFromSubmit && (
            <p style={{ textAlign: "center" }}>{errorFromSubmit}</p>
          )}
          <S.Button type="submit" disabled={loading} />
        </form>
        <S.Change>
          <Link
            style={{
              color: "#aaa",
              fontSize: "0.88rem",
              textDecoration: "none",
            }}
            to="/login"
          >
            로그인
          </Link>
        </S.Change>
      </S.Content>
    </S.Wrapper>
  );
};

export default RegisterPage;
