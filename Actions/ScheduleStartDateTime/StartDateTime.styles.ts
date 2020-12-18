import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 25px;

  @media (max-width: 1680px), (max-height: 1024px) {
    padding-top: 0;
  }
`;

const CalendarWrapper = styled.div`
  width: 355px;
  flex: 1;
  margin-left: auto;
  margin-right: auto;
`;

const Info = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  border-top: solid 1px #edf1f5;
  border-bottom: solid 1px #edf1f5;
  background-color: rgba(243, 242, 251, 0.65);

  @media (max-width: 1680px), (max-height: 1024px) {
    min-height: 45px;
    margin-top: 10px;
  }
`;

const InfoText = styled.span`
  font-size: 14px;
  color: #707090;
`;

const InfoIcon = styled.i`
  width: 26px;
  height: 28px;
  background: transparent url("static/icon/alarm.svg") center no-repeat;
  background-size: contain;
  margin-right: 10px;
`;

const InfoReset = styled.button`
  width: 16px;
  height: 16px;
  appearance: none;
  border: none;
  background: transparent url("static/icon/round-arrow.svg") center no-repeat;
  background-size: contain;
  margin-left: 20px;
  outline: none;
  cursor: pointer;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

const Footer = styled.footer`
  padding: 22px 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1680px), (max-height: 1024px) {
    padding: 10px 0;
  }
`;

export { Wrapper, CalendarWrapper, Info, InfoText, InfoIcon, InfoReset, Underline, Footer };
