import styled from "@emotion/styled";

export const Theme = styled.h1`
  font-size: 3rem;
  color: #62eb6a;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  max-width: 350px;
  margin-left: auto;
  display: flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid #ccc;
  overflow: hidden;
  padding-left: 10px;
`;

export const Search = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
`;

export const SearchBtn = styled.input`
  height: 30px;
  border: none;
  padding: 0 10px;
  border-left: 1px solid #eee;
  background: none;
  font-size: 1rem;
  font-weight: bold;
  color: #62eb6a;
  cursor: pointer;
`;

export const NewsTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;

  :hover {
    text-decoration: underline;
  }
`;
