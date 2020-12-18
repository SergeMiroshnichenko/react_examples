import styled from "@emotion/styled";

const Wrapper = styled.div`
  flex: 1;
  padding: 15px 30px 20px;
  display: flex;
  flex-direction: column;
`;

const DaysSelect = styled.div`
  margin-top: 20px;

  &:first-of-type {
    margin-top: 0;
  }
`;

const Description = styled.span`
  font-size: 12px;
  color: #6f7481;
  margin-top: 30px;
`;

const DaysList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const Day = styled.button<{ isActive: boolean }>`
  width: 36px;
  height: 36px;
  flexshrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #fff;
  transition: all 0.2s ease;
  background: rgba(239, 99, 135, 0.4);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  textalign: center;

  ${({ isActive }) =>
    isActive &&
    `
    background-color: #ef6387;
    color: #FFF;
    font-family: geomanistbook;
  `};
`;

export { Wrapper, DaysSelect, Description, DaysList, Day };
