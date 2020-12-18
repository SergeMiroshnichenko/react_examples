import styled from "@emotion/styled";

const Warning = styled.div<{ isVisible: boolean }>`
  padding: 30px 48px 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #f9fbfd;
  opacity: 0;
  transition: all 0.2s ease;
  width: 546px;
  position: absolute;
  top: 52px;
  left: 50%;
  transform: translateX(-50%) scale(0.9);
  visibility: hidden;
  z-index: 2;

  ${({ isVisible }) =>
    isVisible &&
    `
    opacity: 1;
    transform: translateX(-50%) scale(1);
    visibility: visible;
  `};

  @media (max-height: 1024px) {
    top: 0;
  }
`;

const WarningStartCampaign = styled(Warning)`
  top: 295px;
  height: 44px;
  border-radius: 3px;
  background-color: rgba(253, 215, 225, 0.5);
  padding: 0 25px;
  justify-content: center;
  @media (max-height: 1024px) {
    top: 295px;
  }
  > span {
    font-size: 12px;
    font-family: geomanistregular;
    color: rgba(239, 99, 135, 0.65);
  }
`;

const Title = styled.span`
  text-align: center;
  font-size: 18px;
  font-weight: normal;
  text-align: center;
  color: #6f7481;
`;

const Description = styled.p`
  margin-top: 28px;
  text-align: center;
  font-size: 15px;
  font-weight: normal;
  line-height: 21px;
  text-align: center;
  color: #6f7481;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #e9e6fd;
  width: 100%;
  margin: 8px 0 30px;
`;

const Question = styled.p`
  font-size: 15px;
  font-weight: normal;
  line-height: 21px;
  text-align: center;
  color: #6f7481;
`;

const Actions = styled.div`
  margin-top: 45px;
  display: flex;
  justify-content: center;
`;

export { Warning, Title, Description, Divider, Question, Actions, WarningStartCampaign };
