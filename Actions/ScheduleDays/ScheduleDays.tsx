import React, { useState, useEffect } from "react";

import { FlowOutlineButton, FlowPinkButton } from "components/shared/Button";

import Checkbox from "../../Checkbox";
import { Action, Header, Title, CloseButton, ActionBody, Footer } from "../Actions.styles";
import { ActionProps, WorkflowSettings, Days } from "../Actions.interfaces";
import { Wrapper, DaysSelect, Description, DaysList, Day } from "./ScheduleDays.styles";

export interface DaysData extends WorkflowSettings {
  enable_all_days: boolean;
  enable_only_weekends: boolean;
}

interface ScheduleDaysProps extends ActionProps {
  onChange: (settings: string) => void;
}

export const DAYS_LIST = [
  {
    key: "M",
    fullname: Days.MONDAY,
  },
  {
    key: "T",
    fullname: Days.TUESDAY,
  },
  {
    key: "W",
    fullname: Days.WEDNESDAY,
  },
  {
    key: "Th",
    fullname: Days.THURSDAY,
  },
  {
    key: "F",
    fullname: Days.FRIDAY,
  },
  {
    key: "S",
    fullname: Days.SATURDAY,
    isWeekend: true,
  },
  {
    key: "Su",
    fullname: Days.SUNDAY,
    isWeekend: true,
  },
];

const ScheduleDays: React.FunctionComponent<ScheduleDaysProps> = ({ data, onChange, onClose }) => {
  const [localData, setLocalData] = useState<DaysData>({
    enable_all_days: false,
    enable_only_weekends: false,
    sendon_days: [],
  });

  const isOnlyWeekedsChecked = (days: Days[]): boolean =>
    days.length === 5 && days.indexOf(Days.SATURDAY) === -1 && days.indexOf(Days.SUNDAY) === -1;

  useEffect(() => {
    const parsedSettings = JSON.parse(data.settings || "null");
    if (parsedSettings) {
      const parsedDays: Days[] =
        typeof parsedSettings.sendon_days === "string" ? parsedSettings.sendon_days.split(",") : [];

      setLocalData({
        ...parsedSettings,
        sendon_days: parsedDays,
        enable_all_days: parsedDays.length === DAYS_LIST.length,
        enable_only_weekends: isOnlyWeekedsChecked(parsedDays),
      });
    }
  }, [data]);

  const handleToggleDay = (day: Days) => {
    const selectedDayIndex = localData.sendon_days.indexOf(day);
    let onlyWeekends: boolean = false;
    let newDaysList: Days[] = [];

    if (selectedDayIndex >= 0) {
      // Disable uncheck last day
      if (localData.sendon_days.length === 1) {
        return;
      }
      // Remove selected day
      newDaysList = localData.sendon_days.filter(selectedDay => selectedDay !== day);
    } else {
      // Add selected day
      newDaysList = [...localData.sendon_days, day];
    }

    if (isOnlyWeekedsChecked(newDaysList)) {
      onlyWeekends = true;
    }

    setLocalData({
      ...localData,
      enable_all_days: newDaysList.length === DAYS_LIST.length,
      enable_only_weekends: onlyWeekends,
      sendon_days: newDaysList,
    });
  };

  const handleSelectAllDays = () =>
    setLocalData({
      ...localData,
      enable_all_days: true,
      enable_only_weekends: false,
      sendon_days: [...DAYS_LIST.map(day => day.fullname)],
    });

  const handleSelectWeekends = () => {
    const weekendDays = DAYS_LIST.filter(day => !day.isWeekend).map(day => day.fullname);

    setLocalData({
      ...localData,
      enable_all_days: false,
      enable_only_weekends: true,
      sendon_days: [...weekendDays],
    });
  };

  const handleSave = () => {
    const jsonSettings = JSON.stringify({
      timezone: localData.timezone,
      start_time: localData.start_time,
      end_time: localData.end_time,
      exclude_holidays: localData.exclude_holidays,
      sendon_days: localData.sendon_days.join(","),
    });

    onChange(jsonSettings);
  };

  return (
    <Action>
      <Header>
        <Title>Flow Schedule</Title>
        <CloseButton onClick={onClose} />
      </Header>

      <ActionBody>
        <Wrapper>
          <DaysSelect>
            <Checkbox
              label="Enable All Days"
              isLarge={true}
              isChecked={localData.enable_all_days}
              onChange={handleSelectAllDays}
            />
          </DaysSelect>
          <DaysSelect>
            <Checkbox
              label="Enable Weekdays Only"
              isLarge={true}
              isChecked={localData.enable_only_weekends}
              onChange={handleSelectWeekends}
            />
          </DaysSelect>

          <Description>Schedule actions on the following days only (select all that apply):</Description>

          <DaysList>
            {DAYS_LIST.map(day => (
              <Day
                key={day.key}
                onClick={() => handleToggleDay(day.fullname)}
                isActive={localData.sendon_days.indexOf(day.fullname) >= 0}
              >
                {day.key}
              </Day>
            ))}
          </DaysList>

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

export default ScheduleDays;
