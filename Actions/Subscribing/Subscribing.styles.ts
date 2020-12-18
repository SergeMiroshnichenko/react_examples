import { keyframes } from "@emotion/core";
import styled from "@emotion/styled";

export const pulsing = keyframes`{
  50% {
    opacity: 0;
  }
}`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 35px 30px 20px;
  flex: 1;
  font-size: 14px;
  line-height: 21px;
  color: #6f7481;
`;

const Description = styled.span`
  display: block;
  padding: 0 5px;
  margin: 0;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 54px;
`;

const InputLabel = styled.span`
  padding: 0 5px;
`;

const Area = styled.div`
  height: 160px;
  overflow: hidden;
  position: relative;
  display: flex;
`;

const EditableArea = styled.textarea`
  flex: 1;
  border-radius: 3px;
  border: none;
  appearance: none;
  background-color: rgba(243, 242, 251, 0.65);
  font-size: 14px;
  line-height: 21px;
  letter-spacing: normal;
  color: #6f7481;
  padding: 18px 30px;
  resize: none;
  outline: none;
  max-width: 100%;
`;

const HiddenArea = styled.textarea`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  width: 100%;
`;

const VisibleArea = styled.div`
  flex: 1;
  border-radius: 3px;
  border: none;
  appearance: none;
  background-color: rgba(243, 242, 251, 0.65);
  font-size: 14px;
  line-height: 21px;
  letter-spacing: normal;
  color: #6f7481;
  padding: 18px 30px;
  resize: none;
  outline: none;
  word-break: break-all;
  overflow: hidden;
  max-width: 100%;
`;

const AreaCaret = styled.span<{ isVisible: boolean }>`
  width: 1px;
  height: 16px;
  background-color: rgba(111, 116, 129, 0.65);
  opacity: 1;
  visibility: hidden;
  transform: translateY(2px);
  margin-left: 2px;
  display: inline-block;

  animation-duration: 750ms;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${pulsing};
  animation-timing-function: ease;

  ${({ isVisible }) => isVisible && `visibility: visible;`}
`;

const InputDescription = styled.span`
  margin-top: 7px;
  font-size: 11px;
  line-height: 12px;
  padding: 0 5px;
`;

const LinkExample = styled.span`
  text-decoration: underline;
  user-select: none;
  pointer-events: none;
  margin-left: 4px;
`;

export {
  Wrapper,
  Description,
  Underline,
  Input,
  InputLabel,
  Area,
  EditableArea,
  HiddenArea,
  VisibleArea,
  InputDescription,
  AreaCaret,
  LinkExample,
};
