import styled from "@emotion/styled";

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabsHeader = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 40px;
`;

const TabsHeaderItem = styled.div<{ isActive: boolean }>`
  margin-left: 20px;
  height: 18px;
  font-size: 14px;
  color: rgba(111, 116, 129, 0.65);
  outline: none;
  border: none;
  cursor: pointer;
  background: transparent;
  position: relative;
  ${({ isActive }) => isActive && `font-family: geomanistbook;`};

  &:first-of-type {
    margin-left: 0;
  }

  &::before {
    content: "";
    height: 3px;
    position: absolute;
    left: 50%;
    width: 0;
    top: 100%;
    margin-top: 4px;
    background: rgba(111, 116, 129, 0.65);
    transition: all 0.2s ease;

    ${({ isActive }) => isActive && `left: calc(50% - 35px); width: 70px;`};
  }
`;

const TabsBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabsBodyItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export { Tabs, TabsHeader, TabsHeaderItem, TabsBody, TabsBodyItem };
