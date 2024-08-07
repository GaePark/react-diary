import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 450px) {
    padding: 10px;
  }
`;

export const Content = styled.div`
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 48px;
  color: #75ff70;
  margin-bottom: 10px;
  cursor: default;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 99px;
  border: none;
  background-color: #eee;
  padding-left: 10px;
  margin-top: 10px;
  line-height: 40px;
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 99px;
  border: none;
  background-color: #75ff70;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.35s;

  :hover {
    background-color: #70ff9d;
    color: black;
  }
`;
export const Change = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  margin-top: 10px;
`;
