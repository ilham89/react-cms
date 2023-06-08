import * as React from "react";

import { Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import TagsViewAction from "./tagViewAction";
import { MenuChild, MenuList } from "../menu";
import useHeaderTag from "@/stores/headerTag";

const TagsView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tags, activeTagId, addTag, removeTag, setActiveTagId] = useHeaderTag((state) => [
    state.tags,
    state.activeTagId,
    state.addTag,
    state.removeTag,
    state.setActiveTagId,
  ]);

  const menuList = [
    {
      code: "dashboard",
      label: "Dashboard",
      icon: "dashboard",
      path: "/dashboard",
    },
    {
      code: "documentation",
      label: "Documentation",
      icon: "documentation",
      path: "/documentation",
    },
    {
      code: "permission",
      label: "Permission",
      icon: "permission",
      path: "/permission",
      children: [
        {
          code: "routePermission",
          label: "Route Permission",
          path: "/permission/route",
        },
        {
          code: "notFound",
          label: "404",
          path: "/permission/404",
        },
      ],
    },
  ];

  const setCurrentTag = React.useCallback(
    (id?: string) => {
      const tag = tags.find((item) => {
        if (id) {
          return item.path === id;
        } else {
          return item.path === location.pathname;
        }
      });

      if (tag) {
        setActiveTagId(tag.path);
      }
    },
    [location.pathname, tags],
  );

  // onClick tag
  const onChange = (key: string) => {
    const tag = tags.find((tag) => tag.path === key);

    if (tag) {
      setCurrentTag(tag.path);
    }
  };

  // onRemove tag
  const onClose = (targetKey: string) => {
    removeTag(targetKey);
  };

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];

    menu.forEach((m) => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach((mu) => {
          MenuListAll.push(mu);
        });
      }
    });

    return MenuListAll;
  };

  React.useEffect(() => {
    navigate(activeTagId);
  }, [activeTagId]);

  React.useEffect(() => {
    if (initMenuListAll(menuList).length) {
      const menu = initMenuListAll(menuList).find((m) => m.path === location.pathname);

      if (menu) {
        addTag({
          ...menu,
          closable: menu.code !== "dashboard",
        });
      }
    }
  }, [location.pathname, JSON.stringify(menuList)]);

  return (
    <div id="pageTabs" style={{ padding: "6px 4px" }}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={onChange}
        activeKey={activeTagId}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) => action === "remove" && onClose(targetKey as string)}
        tabBarExtraContent={<TagsViewAction />}
        items={tags.map((tag) => {
          return {
            key: tag.path,
            closable: tag.closable,
            label: tag.label,
          };
        })}
      />
    </div>
  );
};

export default TagsView;
