import React, { useState } from "react";

import { Field, FieldWrapper, FieldTitle, FieldValue, FieldValidIcon, FieldRequiredMark } from "./Field.styles";

interface FieldProps {
  title: string;
  isValid?: boolean;
  isRequired?: boolean;
}

const CustomField: React.FunctionComponent<FieldProps> = ({ title, isValid = false, isRequired = false, children }) => {
  const [isHover, setHover] = useState<boolean>(false);

  return (
    <Field onMouseOver={() => isRequired && setHover(true)} onMouseLeave={() => isRequired && setHover(false)}>
      <FieldWrapper>
        <FieldTitle>{title}</FieldTitle>
        <FieldValue>{children}</FieldValue>
        {isValid && <FieldValidIcon />}
      </FieldWrapper>
      {isRequired && <FieldRequiredMark isVisible={isHover}>*</FieldRequiredMark>}
    </Field>
  );
};

export default CustomField;
