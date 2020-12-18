import React from "react";

import { Field, FieldInput, FieldIcon } from "./SearchField.styles";

interface FieldProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const SearchField: React.FunctionComponent<FieldProps> = ({ placeholder, value, onChange }) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => onChange(e.currentTarget.value);

  return (
    <Field>
      <FieldIcon />
      <FieldInput placeholder={placeholder} value={value} onChange={handleChange} />
    </Field>
  );
};

export default SearchField;
