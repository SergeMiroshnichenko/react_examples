import React, { useState } from "react";

import { Tabs, TabsHeader, TabsHeaderItem, TabsBody, TabsBodyItem } from "./Tabs.styles";

interface TabsProps {
  headers: string[];
  bodies: React.ReactElement[];
}

const CustomTabs: React.FunctionComponent<TabsProps> = ({ headers, bodies }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <Tabs>
      <TabsHeader>
        {headers.map((headerText: string, index: number) => (
          <TabsHeaderItem key={`header-${index}`} isActive={activeTab === index} onClick={() => setActiveTab(index)}>
            {headerText}
          </TabsHeaderItem>
        ))}
      </TabsHeader>
      <TabsBody>
        {bodies.map((body: React.ReactElement, index: number) => {
          if (activeTab !== index) {
            return null;
          }
          return <TabsBodyItem key={index}>{body}</TabsBodyItem>;
        })}
      </TabsBody>
    </Tabs>
  );
};

export default CustomTabs;
