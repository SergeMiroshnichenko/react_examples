import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

import { Workflow, PublicData, QueryUserPublicDataArgs } from "types/types.generated";

import Avatar from "../../../Avatar";
import { FlowItem, Name, Others, Steps, Days, Graphic, DaysName, DaysValue } from "./Flow.styles";

interface FlowProps extends Workflow {
  onSelect: () => void;
}

interface UserDataResponse {
  userPublicData: [PublicData];
}

const GET_FLOW_AUTHOR = gql`
  query userPublicData($id: [Int]!) {
    userPublicData(id: $id) {
      first_name
      last_name
      avatar
    }
  }
`;

const Flow: React.FunctionComponent<FlowProps> = ({ id, name, owner_id, days, steps, engaged_percent, onSelect }) => {
  const { data } = useQuery<UserDataResponse, QueryUserPublicDataArgs>(GET_FLOW_AUTHOR, {
    variables: {
      id: [owner_id],
    },
  });

  const flowCreator: PublicData | null = data ? data.userPublicData[0] : null;
  // Set placeholder for creator initials
  let flowCreatorInitials: string = "- -";

  if (flowCreator !== null && flowCreator.first_name) {
    flowCreatorInitials = flowCreator.first_name;
    if (flowCreator.last_name) {
      flowCreatorInitials += ` ${flowCreator.last_name}`;
    }
  }

  return (
    <FlowItem onClick={onSelect}>
      <Avatar name={flowCreatorInitials} imageSrc={flowCreator && flowCreator.avatar} id={id} size="small" />
      <Name>{name}</Name>
      <Others>
        <Steps>{steps || 0}</Steps>
        <Days>
          <DaysName>days</DaysName>
          <DaysValue>{days || 0}</DaysValue>
        </Days>
        <Graphic>{engaged_percent || 0}%</Graphic>
      </Others>
    </FlowItem>
  );
};

export default Flow;
