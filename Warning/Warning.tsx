import React, { useState, useEffect } from "react";

import { FlowOutlineButton, FlowPinkButton } from "../../../../../shared/Button";
import { Warning, Title, Description, Divider, Question, Actions } from "./Warning.styles";

interface WarningProps {
  title: string;
  description: React.ReactNode;
  question: React.ReactNode;
  hasOnlyCloseAction?: boolean;
  customDeclineText?: string;
  customAcceptText?: string;
  noDivider?: boolean;

  onAccept: () => void;
  onDecline: () => void;
}

const CustomWarning: React.FunctionComponent<WarningProps> = ({
  title,
  description,
  question,
  hasOnlyCloseAction,
  customDeclineText,
  customAcceptText,
  noDivider,
  onAccept,
  onDecline,
}) => {
  const [isVisible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    // setVisible(false);
  }, []);

  return (
    <Warning isVisible={isVisible}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {!noDivider && <Divider />}
      <Question>{question}</Question>
      <Actions>
        <FlowOutlineButton onClick={onDecline}>{customDeclineText || "No"}</FlowOutlineButton>
        <FlowPinkButton onClick={onAccept}>{customAcceptText || "Yes"}</FlowPinkButton>
      </Actions>
    </Warning>
  );
};

export default CustomWarning;
