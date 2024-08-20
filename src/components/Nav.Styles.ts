import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

export const Content = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div<{ isAct: boolean }>`
  color: ${(props) => (props.isAct ? "black" : "#ccc")};
  font-size: 1.5em;
  font-weight: ${(props) => (props.isAct ? "700" : "400")};
  padding: 0 20px;
  border-bottom: ${(props) => (props.isAct ? "2px solid #62eb6a" : "none")};
  cursor: pointer;
`;

export const Profile = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Modal = styled.ul`
  width: 100px;
  list-style: none;
  position: absolute;
  top: 100%;
  right: 0;
  text-align: center;
  li {
    border: 1px solid black;
    height: 30px;
    line-height: 30px;
    background-color: white;
  }
`;
