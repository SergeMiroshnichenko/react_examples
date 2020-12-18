import React, { useState, useEffect } from "react";

import { Timezone } from "types/types.generated";
import { FlowOutlineButton, FlowPinkButton } from "components/shared/Button";

import Select from "../../Select";
import { ActionProps, WorkflowTimeSettings } from "../Actions.interfaces";
import { Action, Header, Title, CloseButton, ActionBody, Footer } from "../Actions.styles";
import { Wrapper, Information, Group, Dash, Timezones, TimezonesTitle } from "./ScheduleTime.styles";
import { startTimeList, endTimeList } from "./data.mock";

interface ScheduleTimeProps extends ActionProps {
  onChange: (settings: string) => void;
  timezoneList: Timezone[];
}

const ScheduleTime: React.FunctionComponent<ScheduleTimeProps> = ({ data, timezoneList, onChange, onClose }) => {
  const [localData, setLocalData] = useState<WorkflowTimeSettings>({
    timezone: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    const parsedSettings = JSON.parse(data.settings || "null");
    if (parsedSettings) {
      setLocalData({ ...parsedSettings });
    }
  }, [data]);

  const handleChangeStartTime = (id: number | string) => {
    const indexOfStartTime = endTimeList.findIndex(time => time.id === id);
    const indexOfEndTime = endTimeList.findIndex(time => time.id === localData.end_time);

    if (indexOfStartTime >= indexOfEndTime) {
      setLocalData({ ...localData, start_time: id as string, end_time: endTimeList[indexOfStartTime + 1].id });
    } else {
      setLocalData({ ...localData, start_time: id as string });
    }
  };
  const handleChangeEndTime = (id: number | string) => setLocalData({ ...localData, end_time: id as string });
  const handleChangeTimezone = (id: number | string) => setLocalData({ ...localData, timezone: id as string });

  const timezonesMap = timezoneList.map((timezone: Timezone) => ({
    id: timezone.timezone_name,
    label: `${timezone.abbr} - ${timezone.timezone_name}`,
  }));

  const getTimezoneAbbreviature = (): string => {
    if (localData.timezone !== "") {
      const currentTimezone: Timezone = timezoneList.filter(
        (timezone: Timezone) => timezone.timezone_name === localData.timezone,
      )[0];

      return currentTimezone ? currentTimezone.abbr : (localData.timezone as string);
    }

    return localData.timezone || "";
  };

  const handleSave = () => onChange(JSON.stringify(localData));

  return (
    <Action>
      <Header isCentered={true}>
        <Title>Flow Schedule</Title>
        <CloseButton onClick={onClose} />
      </Header>
      <ActionBody>
        <Wrapper>
          <Information>
            Between:
            <Group>
              <Select
                items={startTimeList}
                activeIndex={localData.start_time as string}
                mainStyles={{ width: 95 }}
                onChange={handleChangeStartTime}
              />
              <Dash>-</Dash>
              <Select
                items={endTimeList}
                disableToId={localData.start_time}
                activeIndex={localData.end_time as string}
                mainStyles={{ width: 95 }}
                onChange={handleChangeEndTime}
              />
            </Group>
            <Timezones>
              <TimezonesTitle>Time zone:</TimezonesTitle>
              <Select
                items={timezonesMap}
                activeIndex={localData.timezone as string}
                hasSearch={true}
                mainStyles={{ width: 75 }}
                customLabel={getTimezoneAbbreviature()}
                dropdownStyles={{ width: 260, transform: "translateX(0)", left: "initial", right: -30 }}
                onChange={handleChangeTimezone}
              />
            </Timezones>
          </Information>
          <Footer>
            <FlowOutlineButton size="small" onClick={() => onClose()}>
              Cancel
            </FlowOutlineButton>
            <FlowPinkButton size="small" onClick={handleSave}>
              Save
            </FlowPinkButton>
          </Footer>
        </Wrapper>
      </ActionBody>
    </Action>
  );
};

export default ScheduleTime;
