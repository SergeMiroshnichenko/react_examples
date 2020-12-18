import React from "react";
import {} from "date-fns";

import { Workflow, StopOnRespond, Timezone } from "types/types.generated";
import { CalendarData } from "../Calendar/Calendar";
import { ActionType, WarningType } from "../../AddToFlowModal.interfaces";
import ActionChooseFlow from "./ChooseFlow";
import ActionStopEvents from "./StopEvents";
import ActionSubscribing from "./Subscribing";
import ActionScheduleDays from "./ScheduleDays";
import ActionScheduleTime from "./ScheduleTime";
import ActionScheduleHolidays from "./ScheduleHolidays";
import ActionScheduleStart from "./ScheduleStartDateTime";
import { DEFAULT_FLOW_SETTINGS } from "./Actions.utils";

interface ActionsProps {
  flow: Workflow;
  activeAction: ActionType | null;
  timezoneList: Timezone[];
  startTime: CalendarData | null;

  onSetData: (data: Partial<Workflow>) => void;
  onSetActiveFlow: (flow: Workflow) => void;
  onToggleWarning: (warningType: WarningType) => void;
  onSetStartDateTime: (data: CalendarData) => void;
  onCloseAction: () => void;
}

const ActionsGroup: React.FunctionComponent<ActionsProps> = ({
  flow,
  activeAction,
  timezoneList,
  startTime,

  onSetData,
  onSetActiveFlow,
  onToggleWarning,
  onSetStartDateTime,
  onCloseAction,
}) => {
  const handleSelectFlow = (newFlow: Workflow) => {
    // Default settings for old flows which doesn't have them
    const checkedFlow: Workflow = newFlow.settings === null ? { ...newFlow, settings: DEFAULT_FLOW_SETTINGS } : newFlow;

    if (flow && flow.id !== newFlow.id) {
      onSetActiveFlow(checkedFlow);
      onToggleWarning(WarningType.WARNING_FLOW_CHANGE);
      return;
    }

    onSetData({ ...checkedFlow });
    onCloseAction();
  };

  const handleChangeStopEvents = (events: StopOnRespond[]) => {
    onSetData({ ...flow, stop_on_respond: [...events] });
    onCloseAction();
  };

  const handleChangeSchedule = (settings: string) => {
    onSetData({ ...flow, settings });
    onCloseAction();
  };

  const handleChangeSubscribing = (isUnsubscribe: boolean, text?: string) => {
    onSetData({ ...flow, unsubscribe_is_enabled: isUnsubscribe, unsubscribe_msg: text });
    onCloseAction();
  };

  const handleChangeScheduleStart = (data: CalendarData) => {
    onSetStartDateTime(data);
    onCloseAction();
  };

  switch (activeAction) {
    case ActionType.SELECT_FLOW:
      return <ActionChooseFlow data={flow} onFlowSelect={handleSelectFlow} onClose={onCloseAction} />;
    case ActionType.SELECT_STOP_EVENTS:
      return <ActionStopEvents data={flow} onChange={handleChangeStopEvents} onClose={onCloseAction} />;
    case ActionType.SELECT_SUBSCRIBING:
      return <ActionSubscribing data={flow} onChange={handleChangeSubscribing} onClose={onCloseAction} />;
    case ActionType.SELECT_SCHEDULE_DAYS:
      return <ActionScheduleDays data={flow} onChange={handleChangeSchedule} onClose={onCloseAction} />;
    case ActionType.SELECT_SCHEDULE_TIME:
      return (
        <ActionScheduleTime
          data={flow}
          onChange={handleChangeSchedule}
          onClose={onCloseAction}
          timezoneList={timezoneList}
        />
      );
    case ActionType.SELECT_SCHEDULE_HOLIDAYS:
      return <ActionScheduleHolidays data={flow} onChange={handleChangeSchedule} onClose={onCloseAction} />;
    case ActionType.SELECT_SCHEDULE_START:
      return (
        <ActionScheduleStart
          data={flow}
          startTime={startTime}
          onChange={handleChangeScheduleStart}
          onClose={onCloseAction}
          timezoneList={timezoneList}
        />
      );
    default:
      return null;
  }
};

export default ActionsGroup;
