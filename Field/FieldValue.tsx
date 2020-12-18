import React from "react";

import { Value } from "./Field.styles";

interface FieldProps {
  value?: string;
  onClick: () => void;
  placeholder?: string;
  isDisabled?: boolean;
}

const CustomField: React.FunctionComponent<FieldProps> = ({ value, placeholder, onClick, isDisabled }) => (
  <Value onClick={isDisabled ? () => null : onClick} isDisabled={isDisabled}>
    {value || placeholder}
  </Value>
);

export default CustomField;
