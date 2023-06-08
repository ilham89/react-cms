import * as React from "react";

import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

import { CustomIcon } from "./customIcon";
import { MenuList } from "@/interfaces/layouts/menu.interface";

interface MenuProps {
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: React.FC<MenuProps> = ({
  menuList,
  openKey,
  onChangeOpenKey,
  selectedKey,
  onChangeSelectedKey,
}) => {
  const navigate = useNavigate();

  const getTitle = (menu: MenuList[0]) => {
    return (
      <span style={{ display: "flex", alignItems: "center" }}>
        <CustomIcon type={menu.icon!} />
        <span>{menu.label}</span>
      </span>
    );
  };

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    onChangeOpenKey(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={(k) => onMenuClick(k.key)}
      className="layout-page-sider-menu text-2"
      items={menuList.map((menu) => {
        return menu.children
          ? {
              key: menu.code,
              label: getTitle(menu),
              children: menu.children.map((child) => ({
                key: child.path,
                label: child.label,
              })),
            }
          : {
              key: menu.path,
              label: getTitle(menu),
            };
      })}
    ></Menu>
  );
};

export default MenuComponent;
