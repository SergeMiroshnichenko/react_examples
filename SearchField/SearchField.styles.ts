import styled from "@emotion/styled";

const Field = styled.div`
  height: 48px;
  display: flex;
  position: relative;
`;

const FieldIcon = styled.i`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid rgba(111, 116, 129, 0.35);
  position: absolute;
  left: 39px;
  top: calc(50% - 8px);

  &::after {
    content: "";
    width: 2px;
    height: 8px;
    border-radius: 2px;
    background: rgba(111, 116, 129, 0.35);
    position: absolute;
    top: 100%;
    margin-top: -2px;
    right: -3px;
    transform: rotate(-45deg);
  }
`;

const FieldInput = styled.input`
  flex: 1;
  padding: 0 62px;
  font-size: 12px;
  font-weight: normal;
  background-color: rgba(243, 242, 251, 0.33);
  border: none;
  color: rgba(111, 116, 129, 0.35);
  outline: none;

  &::placeholder {
    color: rgba(111, 116, 129, 0.35);
  }
`;

export { Field, FieldInput, FieldIcon };
