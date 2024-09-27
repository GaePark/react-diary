import styled from "@emotion/styled";

export const Theme = styled.h1`
  font-size: 3rem;
  color: #62eb6a;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const WriteBtn = styled.button`
  width: 200px;
  height: 50px;
  font-size: 1.5rem;
  color: #fff;
  font-weight: 700;
  border-radius: 99px;
  background-color: #90eb63;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const PageBtn = styled.button`
  background-color: #ccc;
  color: #fff;
  border: none;
  width: 100px;
  height: 25px;
  border-radius: 3px;
  margin: 0 10px;
  cursor: pointer;
  transition: 0.5s;
  :hover {
    background-color: #63eb9a;
  }
`;

export const Post = styled.div`
  border-bottom: 1px solid #ccc;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  :hover {
    background-color: #ebffed;
  }
`;
