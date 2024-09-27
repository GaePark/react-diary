import React, { useEffect } from "react";
import * as S from "./Styles";

import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NewsPage from "./pages/NewsPage/NewsPage";
import PostPage from "./pages/PostPage/PostPage";
import DiaryPage from "./pages/DiaryPage/DiaryPage";
import DetailNewsPage from "./pages/NewsPage/DetailNewsPage/DetailNewsPage";
import DetailDiaryPage from "./pages/DiaryPage/DetailDiaryPage/DetailDiaryPage";
import WritePage from "./pages/WritePage/WritePage";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./store/userSlice";
import { AppDispatch } from "./store";
import WritePostPage from "./pages/PostPage/WritePostPage/WritePostPage";
import EditPostPage from "./pages/PostPage/EditPostPage/EditPostPage";
import EditDiaryPage from "./pages/DiaryPage/EditDiaryPage/EditDiaryPage";
import DetailPostPage from "./pages/PostPage/DetailPostPage/DetailPostPage";
import WriteDiaryPage from "./pages/DiaryPage/WriteDiaryPage/WriteDiaryPage";

const DefaultSetting = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <S.Wrapper>
        <Nav />
        <Outlet />
      </S.Wrapper>
      <Footer />
    </div>
  );
};

function App() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (
          location.pathname === "/" ||
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          navigate("/");
        }

        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
          })
        );
      } else {
        navigate("/login");
        dispatch(clearUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<DefaultSetting />}>
        <Route index element={<MainPage />} />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:newsId" element={<DetailNewsPage />} />

        <Route path="/post" element={<PostPage />} />
        <Route path="/post/write" element={<WritePostPage />} />
        <Route path="/post/edit" element={<EditPostPage />} />
        <Route path="/post/:postId" element={<DetailPostPage />} />

        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/diary/write" element={<WriteDiaryPage />} />
        <Route path="/diary/edit" element={<EditDiaryPage />} />
        <Route path="/diary/:diaryId" element={<DetailDiaryPage />} />

        <Route path="/write" element={<WritePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
