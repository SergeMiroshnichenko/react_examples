import styled from "@emotion/styled";

const Link = styled.a`
  font-family: geomanistbook;
  font-size: 12px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0.18px;
  text-decoration: underline;
  color: #9994c4;

  &:hover {
    text-decoration: none;
  }
`;

const Information = styled.span`
  font-size: 12px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0.18px;
  text-align: center;
  color: #9994c4;
  margin-top: 25px;
`;

export { Information, Link };
