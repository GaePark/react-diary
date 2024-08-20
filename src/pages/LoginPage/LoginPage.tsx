import React, { useState } from "react";
import * as S from "./LoginPage.Styles";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase";

interface FormTypes {
  email: string;
  password: string;
}

const LoginPage = () => {
  const auth = getAuth(app);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFromSubmit, setErrorFromSubmit] = useState<string>("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>();

  const onSubmit = async (data: FormTypes): Promise<void> => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          setErrorFromSubmit("이메일 또는 비밀번호가 일치하지 않습니다.");
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
        <S.Title>Login</S.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            to="/register"
          >
            회원가입
          </Link>
        </S.Change>
      </S.Content>
    </S.Wrapper>
  );
};

export default LoginPage;
