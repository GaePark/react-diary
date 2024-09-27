import styled from "@emotion/styled";

export const Fcontain = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Wrap = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 9px;
  border: 3px solid #e3e3e3;
  position: relative;

  @media (max-width: 1200px) {
    aspect-ratio: 2/1;
  }

  @media (max-width: 900px) {
    aspect-ratio: auto;
  }

  > div div {
    text-align: center;
  }
`;

export const Title = styled.h1`
  color: #62eb6a;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
`;
