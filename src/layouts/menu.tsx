import React from "react";

import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import type { SelectInfo } from "rc-menu/lib/interface";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/dashboard", <PieChartOutlined />),
  getItem("Web Management", "/web-management", <DesktopOutlined />, [
    getItem("Homepage", "/homepage", null, [
      getItem("Hero Section", "/web-management/homepage/hero-section"),
      getItem("Partner", "/web-management/homepage/partner"),
      getItem("About", "/web-management/homepage/about"),
      getItem("CTA", "/web-management/homepage/cta"),
    ]),
    getItem("FAQ", "/faq", null, [
      getItem("Categories", "/web-management/faq/categories"),
      getItem("FAQ List", "/web-management/faq"),
    ]),
    getItem("Terms & Policy", "/terms-policy", null, [
      getItem("Terms and Condition", "/web-management/terms-policy/terms-condition"),
      getItem("Privacy Policy", "/web-management/terms-policy/privacy-policy"),
      getItem("Return policy", "/web-management/terms-policy/return-policy"),
    ]),
    getItem("Contact Us", "/web-management/contact-us"),
  ]),

  getItem("Product Management", "/product-management", <DesktopOutlined />, [
    getItem("Categories", "/product-management/categories"),
    getItem("Product List", "/product-management/products"),
  ]),

  getItem("Permission", "/permission", <DesktopOutlined />, [
    getItem("Route Permission", "/permission/route"),
    getItem("404", "/permission/404"),
  ]),
];

interface MenuNestedProps {
  openKey: string[];
  onChangeOpenKey: (key: string[]) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const MenuComponent = ({
  openKey,
  onChangeOpenKey,
  selectedKey,
  onChangeSelectedKey,
}: MenuNestedProps) => {
  const navigate = useNavigate();

  const onClickSelect = (k: SelectInfo) => {
    onChangeSelectedKey(k.key);

    navigate(k.key);
    const data = k.keyPath;
    data.shift();
    data.slice();
    data.reverse();
    onChangeOpenKey(data);
  };

  return (
    <Menu
      selectedKeys={[selectedKey]}
      defaultOpenKeys={openKey}
      className="layout-page-sider-menu text-2"
      mode="inline"
      items={items}
      onSelect={(k) => onClickSelect(k)}
    />
  );
};

export default MenuComponent;
