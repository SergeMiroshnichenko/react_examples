import React, { useState } from "react";

import { FlowOutlineButton, FlowPinkButton } from "components/shared/Button";

import Checkbox from "../../Checkbox";
import { ActionProps } from "../Actions.interfaces";
import { Action, Header, Title, CloseButton, ActionBody, Footer } from "../Actions.styles";
import { Wrapper, Description, Underline, Input, InputLabel, Area, EditableArea } from "./Subscribing.styles";

interface SubscribingProps extends ActionProps {
  onChange: (isUnsubscribe: boolean, text?: string) => void;
}

const Subscribing: React.FunctionComponent<SubscribingProps> = ({ data, onChange, onClose }) => {
  const [isUnsubscribe, setUnsubscribe] = useState<boolean>(data.unsubscribe_is_enabled);
  const [text, setText] = useState<string>(data.unsubscribe_msg || "");

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentText = e.currentTarget.value;
    const linkExampleRegexp = new RegExp(/ {unsubscribe link added here}/);

    if (!currentText.match(linkExampleRegexp)) {
      return;
    }

    const cutText = currentText.replace(linkExampleRegexp, "");
    setText(cutText);
  };

  return (
    <Action>
      <Header>
        <Title>Unsubscribe Settings</Title>
        <CloseButton onClick={onClose} />
      </Header>
      <ActionBody>
        <Wrapper>
          <Checkbox
            label={
              <Description>
                We will automatically insert the <Underline>unsubscribe</Underline> link at the end of your message.
              </Description>
            }
            isChecked={isUnsubscribe}
            onChange={() => setUnsubscribe(!isUnsubscribe)}
          />

          <Input>
            <InputLabel>The default message is:</InputLabel>
            <Area>
              <EditableArea onChange={handleChangeText} value={text + " {unsubscribe link added here}"} />
            </Area>
          </Input>

          <Footer>
            <FlowOutlineButton size="small" onClick={() => onClose()}>
              Cancel
            </FlowOutlineButton>
            <FlowPinkButton size="small" onClick={() => onChange(isUnsubscribe, text)}>
              Save
            </FlowPinkButton>
          </Footer>
        </Wrapper>
      </ActionBody>
    </Action>
  );
};

export default Subscribing;
