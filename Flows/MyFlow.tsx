import React, { useState } from "react";

import { Workflow } from "types/types.generated";

import { CreateFlowInfo } from "../FlowEmptyStates";
import SearchField from "../SearchField";
import FlowItem from "./FlowItem";
import { Flow, FlowList } from "./Flow.styles";

interface FlowProps {
  onFlowSelect: (flow: Workflow) => void;
  flows: Workflow[];
}

const MyFlows: React.FunctionComponent<FlowProps> = ({ onFlowSelect, flows }) => {
  const [searchText, setSearchText] = useState<string>("");

  const filterFlowsByName = (flow: Workflow) => {
    if (flow.name.toLocaleLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
      return flow;
    }
    return;
  };

  const filteredFlows: Workflow[] = searchText ? flows.filter(filterFlowsByName) : flows;

  return (
    <Flow>
      <SearchField
        placeholder="Search my flows"
        value={searchText}
        onChange={(value: string) => setSearchText(value)}
      />

      <FlowList>
        {filteredFlows.length ? (
          filteredFlows.map((flow: Workflow) => (
            <FlowItem key={flow.id} {...flow} onSelect={() => onFlowSelect(flow)} />
          ))
        ) : (
          <CreateFlowInfo />
        )}
      </FlowList>
    </Flow>
  );
};

export default MyFlows;
