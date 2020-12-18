import React from "react";

import { Checkbox, Label, Indicator } from "./Checkbox.styles";

interface CheckboxProps {
  label: React.ReactNode;

  isLarge?: boolean;
  isReverse?: boolean;
  isChecked: boolean;

  onChange: () => void;
}

const CustomCheckbox: React.FunctionComponent<CheckboxProps> = ({ label, isLarge, isReverse, isChecked, onChange }) => (
  <Checkbox isReverse={isReverse} isLarge={isLarge} onClick={onChange}>
    <Indicator isActive={isChecked} isReverse={isReverse} isLarge={isLarge} />
    <Label>{label}</Label>
  </Checkbox>
);

export default CustomCheckbox;
