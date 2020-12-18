import React, { useState } from "react";

import { Roles } from "lib/constants";
import { Workflow } from "types/types.generated";

import { InfoNoSharedFlows } from "../FlowEmptyStates";
import SearchField from "../SearchField";
import FlowItem from "./FlowItem";
import { Flow, FlowList } from "./Flow.styles";

interface FlowProps {
  onFlowSelect: (flow: Workflow) => void;
  flows: Workflow[];
  userRole: Roles | null;
}

const SharedFlows: React.FunctionComponent<FlowProps> = ({ onFlowSelect, flows, userRole }) => {
  const [searchText, setSearchText] = useState<string>("");

  const filterFlowsByName = (flow: Workflow) => {
    if (flow.name.toLocaleLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
      return flow;
    }
    return;
  };

  const handleFilterByRole = (flow: Workflow) => {
    if (userRole === null) {
      // console.error("Can't be defined role of user");
      return {};
    }

    if (userRole === Roles.TeamMember || userRole === Roles.Manager) {
      return !flow.is_private;
    } else {
      return true;
    }
  };

  const filteredByRoleFlows: Workflow[] = flows.filter(handleFilterByRole);
  const filteredFlows: Workflow[] = searchText ? filteredByRoleFlows.filter(filterFlowsByName) : filteredByRoleFlows;

  return (
    <Flow>
      <SearchField
        placeholder="Search shared flows"
        value={searchText}
        onChange={(value: string) => setSearchText(value)}
      />

      <FlowList>
        {filteredFlows.length ? (
          filteredFlows.map((flow: Workflow) => (
            <FlowItem key={flow.id} {...flow} onSelect={() => onFlowSelect(flow)} />
          ))
        ) : (
          <InfoNoSharedFlows />
        )}
      </FlowList>
    </Flow>
  );
};

export default SharedFlows;
