import React, { useState } from "react";
import { format } from "date-fns";

import { Timezone } from "types/types.generated";
import Tooltip from "components/shared/Tooltip";
import { FlowOutlineButton, FlowPinkButton } from "components/shared/Button";

import Calendar from "../../Calendar";
import { CalendarData } from "../../Calendar/Calendar";
import { Action, Header, Title, ActionBody } from "../Actions.styles";
import { ActionProps } from "../Actions.interfaces";
import {
  Wrapper,
  CalendarWrapper,
  Info,
  InfoText,
  InfoIcon,
  InfoReset,
  Underline,
  Footer,
} from "./StartDateTime.styles";

interface ScheduleProps extends ActionProps {
  timezoneList: Timezone[];
  startTime: CalendarData | null;
  onChange: (date: CalendarData) => void;
}

const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const INIT_DATA: CalendarData = {
  date: new Date(),
  time: "",
  timezone: defaultTimezone,
};

const StartDateTime: React.FunctionComponent<ScheduleProps> = ({ startTime, timezoneList, onChange, onClose }) => {
  const [isScheduleChanged, setNewSchedule] = useState<boolean>(startTime !== null && startTime.shortInfo !== "");
  const [localData, setLocalData] = useState<CalendarData>(startTime || INIT_DATA);

  const formatScheduleInfo = (): string => {
    const formattedDate = localData.date && format(localData.date, "MM/DD/YYYY");
    const formattedTime = localData.time.toLowerCase().replace(" ", "");
    const currentTimezoneItem = timezoneList.filter(timezone => timezone.timezone_name === localData.timezone)[0];
    const timezoneAbbr = currentTimezoneItem ? currentTimezoneItem.abbr : "";

    let formattedFullInfo = formattedDate;

    if (formattedTime !== "" || timezoneAbbr !== "") {
      if (formattedFullInfo !== "") {
        formattedFullInfo += " @ ";
      }
      formattedFullInfo += formattedTime + " " + timezoneAbbr;
    }

    return formattedFullInfo;
  };

  const handleUpdateData = (data: CalendarData, isForceUpdate?: boolean) => {
    if (!isForceUpdate) {
      setNewSchedule(true);
    }
    setLocalData({ ...data });
  };

  const handleResetData = () => {
    setLocalData(INIT_DATA);
    setNewSchedule(false);
  };

  let isSaveDisabled: boolean = false;

  if (isScheduleChanged) {
    if (!localData.time || !localData.timezone) {
      isSaveDisabled = true;
    }
  }

  return (
    <Action>
      <Header>
        <Title>Schedule Start Date / Time</Title>
      </Header>
      <ActionBody>
        <Wrapper>
          <CalendarWrapper>
            <Calendar timezoneList={timezoneList} onChange={handleUpdateData} currentData={localData} />
          </CalendarWrapper>
          <Info>
            <InfoIcon />
            {isScheduleChanged ? (
              <>
                <InfoText>
                  Scheduled to send <Underline>{formatScheduleInfo()}</Underline>
                </InfoText>
                <InfoReset
                  onClick={handleResetData}
                  data-for="schedule-reset"
                  data-tip="<span style='color: rgba(111, 116, 129, 0.65);'>Send immediately</span>"
                  data-html={true}
                />
                <Tooltip
                  type="light"
                  effect="solid"
                  place="top"
                  id="schedule-reset"
                  html={true}
                  delayShow={100}
                  delayHide={350}
                />
              </>
            ) : (
              <InfoText>
                Scheduled to send <Underline>immediately</Underline>
              </InfoText>
            )}
          </Info>
          <Footer>
            <FlowOutlineButton size="small" onClick={() => onClose()}>
              Cancel
            </FlowOutlineButton>
            <FlowPinkButton
              size="small"
              onClick={() =>
                isSaveDisabled
                  ? null
                  : onChange({ ...localData, shortInfo: isScheduleChanged ? formatScheduleInfo() : "" })
              }
              isDisabled={isSaveDisabled}
            >
              Save
            </FlowPinkButton>
          </Footer>
        </Wrapper>
      </ActionBody>
    </Action>
  );
};

export default StartDateTime;
