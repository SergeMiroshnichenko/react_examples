import { Workflow } from "types/types.generated";

export enum Days {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday",
}

export interface WorkflowDaysSettings {
  sendon_days: Days[];
}
export interface WorkflowHolidaysSettings {
  exclude_holidays?: string;
}
export interface WorkflowTimeSettings {
  end_time?: string;
  start_time?: string;
  timezone?: string;
}
export interface WorkflowSettings extends WorkflowDaysSettings, WorkflowHolidaysSettings, WorkflowTimeSettings {}

export interface ActionProps {
  data: Workflow;
  onClose: () => void;
}
