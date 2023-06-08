import * as React from "react";

import { SettingOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

import useHeaderTag from "@/stores/headerTag";

const TagsViewAction: React.FC = () => {
  const [activeTagId, removeTag, removeOtherTag, removeAllTag] = useHeaderTag((state) => [
    state.activeTagId,
    state.removeTag,
    state.removeOtherTag,
    state.removeAllTag,
  ]);
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "0",
            onClick: () => removeTag(activeTagId),
            label: "Close Current",
          },
          {
            key: "1",
            onClick: () => removeOtherTag(),
            label: "Close Other",
          },
          {
            key: "2",
            onClick: () => removeAllTag(),
            label: "Close All",
          },
        ],
      }}
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  );
};

export default TagsViewAction;
