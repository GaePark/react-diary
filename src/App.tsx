import React from "react";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NewsPage from "./pages/NewsPage/NewsPage";
import PostPage from "./pages/PostPage/PostPage";
import CalendalPage from "./pages/CalendalPage/CalendalPage";
import DiaryPage from "./pages/DiaryPage/DiaryPage";
import DetailNewsPage from "./pages/NewsPage/DetailNewsPage/DetailNewsPage";
import DetailDiaryPage from "./pages/DiaryPage/DetailDiaryPage/DetailDiaryPage";
import WritePage from "./pages/WritePage/WritePage";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const DefaultSetting = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultSetting />}>
        <Route index element={<MainPage />} />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:newsId" element={<DetailNewsPage />} />

        <Route path="/post" element={<PostPage />} />
        <Route path="/post/:postId" element={<DetailDiaryPage />} />

        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/diary/:diaryId" element={<DetailDiaryPage />} />

        <Route path="/calendal" element={<CalendalPage />} />

        <Route path="/write" element={<WritePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
