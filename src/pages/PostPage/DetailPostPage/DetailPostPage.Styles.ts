import styled from "@emotion/styled";

export const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.h1`
  font-size: 2rem;
  color: black;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const HeaderWriter = styled.span`
  color: black;
  margin-left: 10px;
`;

export const HeaderTime = styled.p`
  color: #d3d3d3;
  font-size: 0.88rem;
  font-weight: 400;
`;

export const Content = styled.div`
  margin-top: 20px;
  padding: 0 5px;
`;
