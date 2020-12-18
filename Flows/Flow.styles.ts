import styled from "@emotion/styled";

const Flow = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlowList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 37px 0 34px;
  min-height: 275px;
  max-height: 275px;
  overflow: hidden;
  overflow-y: auto;
`;

const FlowItem = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 55px;
  border-bottom: 1px dashed #e5e9f2;
  padding: 0 26px 0 5px;
  transition: all 0.2s ease;
  position: relative;

  &::before {
    content: "";
    width: 9px;
    height: 9px;
    position: absolute;
    right: 100%;
    margin-right: 12px;
    top: calc(50% - 4.5px);
    background-color: #ef6387;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    font-family: geomanistbook;
    cursor: pointer;

    &::before {
      opacity: 1;
    }
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const Name = styled.div`
  font-size: 12px;
  font-weight: normal;
  letter-spacing: 0.18px;
  color: #6f7481;
  margin-left: 10px;
  padding-right: 10px;
`;

const Others = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  font-family: geomanistbook;
  flex-shrink: 0;
`;

const Steps = styled.div`
  min-width: 50px;
  text-align: center;
  padding: 4px 8px 4px 30px;
  font-size: 12px;
  letter-spacing: 0.18px;
  color: #6f7481;
  border-radius: 2px;
  background-color: rgba(243, 242, 251, 0.33);
  position: relative;

  &::before {
    content: "";
    width: 16px;
    height: 16px;
    position: absolute;
    top: calc(50% - 8px);
    left: 7px;
    background: transparent url("static/icon/flow-steps-icon.svg") center no-repeat;
    background-size: contain;
  }
`;

const Days = styled.div`
  width: 28px;
  height: 25px;
  text-align: center;
  color: #ffffff;
  margin-left: 12px;
  transform: translateY(-1px);

  background: transparent url("static/icon/flow-days-icon.svg") center no-repeat;
  background-size: contain;
`;

const DaysName = styled.div`
  font-size: 6px;
  line-height: normal;
  letter-spacing: 0.09px;
  margin-top: 2px;
`;

const DaysValue = styled.div`
  font-size: 9px;
  line-height: 11px;
  letter-spacing: 0.13px;
  margin-top: 2px;
  color: #6f7481;
`;

const Graphic = styled.div`
  padding: 4px 4.5px 4px 23.5px;
  margin-left: 15px;
  font-size: 12px;
  letter-spacing: 0.18px;
  color: #6f7481;
  border-radius: 2px;
  background-color: rgba(243, 242, 251, 0.33);
  position: relative;
  width: 56px;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;

  &::before {
    content: "";
    width: 14px;
    height: 13px;
    position: absolute;
    top: calc(50% - 7px);
    left: 5px;
    background: transparent url("static/icon/flow-graphic-icon.svg") center no-repeat;
    background-size: contain;
  }
`;

export { Flow, FlowList, FlowItem, Name, Others, Steps, Days, Graphic, DaysName, DaysValue };
