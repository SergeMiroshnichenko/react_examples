import styled from "@emotion/styled";

const Checkbox = styled.label<{ isReverse?: boolean; isLarge?: boolean }>`
  display: flex;
  align-items: center;
  justify-self: flex-start;
  align-self: flex-start;
  cursor: pointer;
  flex-shrink: 0;

  font-size: 14px;
  color: #6f7481;

  ${({ isLarge }) => isLarge && `font-family: geomanistbook;`};
  ${({ isReverse }) => isReverse && `flex-direction: row-reverse`};

  &:hover > i {
    /* background: rgba(203, 199, 237, 0.35); */
  }
`;

const FiltersCheckbox = styled(Checkbox)`
  color: #b3ade5;
  &:hover > i {
    background: #b3ade5;
  }
`;

const Label = styled.span`
  user-select: none;
`;

const Indicator = styled.i<{ isActive: boolean; isLarge?: boolean; isReverse?: boolean }>`
  flex-shrink: 0;
  width: 17px;
  height: 17px;
  background: #fff;
  border-radius: 2px;
  border: 1px solid #ef6387;
  transition: all 0.2s ease;

  ${({ isActive }) => isActive && `background: #ef6387 !important;`};
  ${({ isLarge }) => isLarge && `width: 24px; height: 24px;`};
  ${({ isReverse, isLarge }) =>
    isReverse ? `margin-left: ${isLarge ? 8 : 12}px` : `margin-right: ${isLarge ? 8 : 12}px`};
`;

const IndicatorPurple = styled(Indicator)`
  border: 1px solid #b3ade5;
`;

export { Checkbox, FiltersCheckbox, Label, Indicator, IndicatorPurple };
