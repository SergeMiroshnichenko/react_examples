import styled from "@emotion/styled";

const handleDisabledStyles = ({ isDisabled }: { isDisabled?: boolean }) =>
  isDisabled
    ? `font-family: geomanistbook; cursor: default;`
    : `
&:hover {
  border-color: #f0effc;
  background-color: rgba(60, 66, 83, 0.01);
}
`;

const Field = styled.div`
  min-height: 54px;
  width: 100%;
  background: #f9fbfd;
  border-radius: 2px;
  border: solid 1px #edf1f5;
  display: flex;
  padding: 0 40px 0 14px;
  transition: border 0.2s ease;
  margin-bottom: 10px;
  position: relative;

  &:last-of-type {
    margin-bottom: 10px;
  }

  &:hover {
    border-color: rgba(60, 66, 83, 0.2);
  }
`;

const FieldWrapper = styled.div`
  max-width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: flex-start;
  flex: 1;
`;

const FieldTitle = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: #6f7481;
  flex: 0 0 120px;
  height: 35px;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const FieldValue = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding-left: 10px;
  margin-top: 2px;
  margin-bottom: -12px;
  max-width: 100%;
  min-width: 0;
`;

const Value = styled.button<{ isDisabled?: boolean }>`
  border: none;
  border-radius: 13.5px;
  background-color: #ffffff;
  height: 30px;
  white-space: nowrap;
  padding: 6px 10px;
  outline: none;
  font-size: 13px;
  font-weight: normal;
  text-align: center;
  color: #6f7481;
  border: 1px solid #e5e9f2;
  transition: all 0.25s ease;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 12px;
  display: block;
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:last-of-type {
    margin-right: 10px;
  }

  ${handleDisabledStyles};
`;

const FieldValidIcon = styled.i`
  width: 20px;
  height: 20px;
  background: transparent url("static/icon/flow-field-validate.svg") center no-repeat;
  background-size: contain;
  position: absolute;
  right: 10px;
  top: calc(50% - 10px);
`;

const FieldRequiredMark = styled.span<{ isVisible?: boolean }>`
  font-size: 20px;
  color: #ef6387;
  position: absolute;
  right: 100%;
  height: 20px;
  margin-right: 12px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s ease;

  ${({ isVisible }) => isVisible && `opacity: 1;`};
`;

export { Field, FieldWrapper, FieldTitle, FieldValue, Value, FieldValidIcon, FieldRequiredMark };
