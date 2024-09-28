import React, { useState } from "react";
import { PageWrapper } from "../../Styles";
import axios from "axios";
import * as S from "./NewsPage.Styles";
import { Pagination } from "antd";

interface dataTypes {
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
  title: string;
}

const NewsPage = () => {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState<dataTypes[] | null>();
  const [showData, setShowData] = useState<dataTypes[] | null>();
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");

  const api_url = "/v1/search/news.json"; // JSON 결과

  const getSerchDate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;
    const options = {
      // 요청헤더 설정
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Naver-Client-Id": process.env.REACT_APP_NAVER_ID,
        "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_SECRET,
      },
      // 파라미터 설정
      params: {
        query: keyword,
        display: 50,
      },
    };

    await axios.get(api_url, options).then((result) => {
      setData(result.data.item);
      setShowData(result.data.items.slice(0, 10));
    });
  };

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onClickWindowOpen = (link: string) => {
    window.open(link);
  };

  const onChangePage = (value: number) => {
    const num = value * 10;
    setPage(value);
    setShowData(data?.slice(num - 10, num));
  };

  return (
    <PageWrapper>
      <S.Theme>NEWS</S.Theme>
      <S.Form onSubmit={getSerchDate}>
        <S.Search
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={onChangeKeyword}
        />
        <S.SearchBtn type="submit" value="검색" />
      </S.Form>
      <div style={{ border: "1px solid #eee", margin: "10px" }}></div>
      <div>
        {showData &&
          showData.map((el, index) => (
            <div
              key={index}
              style={{
                cursor: "pointer",
                marginBottom: "10px",
                minHeight: "60px",
                borderBottom: "1px solid #ccc",
              }}
              onClick={() => {
                onClickWindowOpen(el.link);
              }}
            >
              <S.NewsTitle
                dangerouslySetInnerHTML={{ __html: el.title }}
              ></S.NewsTitle>
              <div
                style={{ fontSize: "14px", fontWeight: "300" }}
                dangerouslySetInnerHTML={{ __html: el.description }}
              ></div>
            </div>
          ))}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        {data && (
          <Pagination
            current={page}
            onChange={(value) => onChangePage(value)}
            total={data.length}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default NewsPage;
