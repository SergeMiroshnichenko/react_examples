import styled from "@emotion/styled";

const Select = styled.div`
  position: relative;
  display: flex;
  min-width: 0;
`;

const SelectBody = styled.button<{ hasArrow?: boolean }>`
  flex: 1;
  height: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 13.5px;
  background: #f9fbfd;
  border: none;
  outline: none;
  appearance: none;
  cursor: pointer;
  min-width: 70px;
  color: #6f7481;
  padding: 0 5px;
  font-size: 13px;
  line-height: 16px;
  overflow: hidden;

  ${({ hasArrow }) => hasArrow && `padding-right: 35px; `}
`;

const Value = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const SelectDropdown = styled.div<{ isVisible: boolean }>`
  position: absolute;
  left: 50%;
  top: -5px;
  transform: translateX(-50%);
  box-shadow: 0 4px 8px 0 rgba(82, 97, 115, 0.18);
  background-color: #ffffff;
  min-width: 100px;
  max-height: 300px;
  display: flex;

  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease;

  ${({ isVisible }) => isVisible && `opacity: 1; visibility: visible`};
`;

const SelectItem = styled.div<{ isActive: boolean; isDisabled: boolean }>`
  font-size: 13px;
  color: #6f7481;
  transition: all 0.2s ease;
  margin-bottom: 5px;
  padding: 0 12.5px;
  cursor: pointer;
  min-height: 18px;
  flex-shrink: 0;
  word-break: break-all;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${({ isActive }) => isActive && `font-family: geomanistbook;`};
  ${({ isDisabled }) =>
    isDisabled
      ? `cursor: not-allowed; opacity: .5`
      : `&:hover {
    font-family: geomanistbook;
  }`};
`;

const SelectList = styled.div<{ hasSearch?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 6px 0;
  flex: 1;
  overflow: hidden;
  overflow-y: auto;

  ${({ hasSearch }) => hasSearch && `margin-top: 30px;`};
`;

const SelectSearch = styled.div`
  margin: 5px 0;
  padding: 0 45px 0 15px;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const SearchField = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  height: 20px;
  border-bottom: 1px solid #e5e9f2;
  padding-left: 20px;
  background: transparent url("static/icon/search.svg") left center no-repeat;
  background-size: 15px;
  outline: none;
`;

const ArrowIcon = styled.i<{ isReverse: boolean }>`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
  width: 12px;
  height: 12px;
  border-bottom: 2px solid rgba(111, 116, 129, 0.65);
  border-left: 2px solid rgba(111, 116, 129, 0.65);
  margin-top: -4px;

  ${({ isReverse }) => isReverse && `transform: translateY(-50%) rotate(135deg); margin-top: 2px;`};
`;

export { Select, SelectBody, Value, SelectDropdown, SelectItem, SelectSearch, SearchField, SelectList, ArrowIcon };
