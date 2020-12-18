const getDefaultFlowSettings = (): string => {
  const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return `{"timezone": "${defaultTimezone}","exclude_holidays":"false","sendon_days":"monday,tuesday,wednesday,thursday,friday,saturday,sunday","start_time":"12:00 AM","end_time":"11:59 PM"}`;
};

const DEFAULT_FLOW_SETTINGS = getDefaultFlowSettings();

export { DEFAULT_FLOW_SETTINGS };
