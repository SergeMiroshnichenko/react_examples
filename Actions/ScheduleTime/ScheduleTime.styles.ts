import styled from "@emotion/styled";

const Wrapper = styled.div`
  flex: 1;
  padding: 15px 30px 20px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #6f7481;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
`;

const Group = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

const Dash = styled.span`
  margin: 0 7px;
`;

const Timezones = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const TimezonesTitle = styled.span`
  margin-right: 8px;
`;

export { Wrapper, Information, Group, Dash, Timezones, TimezonesTitle };
