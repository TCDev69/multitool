import { Tab } from "@headlessui/react";
import React, { useState } from "react";

interface TabsProps {
  tabs: string[];
  children: React.ReactNode[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="flex space-x-4 mb-6 justify-center">
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selected
                  ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels>
        {children.map((child, index) => (
          <Tab.Panel key={index}>{child}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
