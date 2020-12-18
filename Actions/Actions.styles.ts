import styled from "@emotion/styled";

const Action = styled.div`
  width: 520px;
  min-height: 415px;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(82, 97, 115, 0.18);
  border-radius: 3px;
  z-index: 2;

  @media (max-width: 1680px) {
    top: 80px;
  }

  @media (max-width: 1440px) {
    top: 45px;
  }

  @media (max-height: 1024px) {
    top: 0;
  }
`;

const Header = styled.div<{ isCentered?: boolean }>`
  height: 62px;
  display: flex;
  align-items: center;
  background-color: rgba(243, 242, 251, 0.33);
  padding: 0 28px;

  ${({ isCentered }) => isCentered && `text-align: center; justify-content: center;`};
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: normal;
  color: #6f7481;
`;

const CloseButton = styled.button`
  margin-left: auto;
  appearance: none;
  border: none;
  outline: none;
  width: 14px;
  height: 14px;
  cursor: pointer;
  background: transparent url("static/icon/action-cross.svg") center no-repeat;
`;

const ActionBody = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
`;

export { Action, Header, Title, CloseButton, ActionBody, Footer };
