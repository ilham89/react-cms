import React from "react";

import Icon from "@ant-design/icons/lib/components/Icon";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import type { SelectInfo } from "rc-menu/lib/interface";
import { useNavigate } from "react-router-dom";

import Dashboard from "@/assets/menu/dashboard";
import ProductManagement from "@/assets/menu/product-management";
import WebManagement from "@/assets/menu/web-management";

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
  getItem("Dashboard", "/dashboard", <Icon component={Dashboard} />),
  getItem("Web Management", "/web-management", <Icon component={WebManagement} />, [
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

  getItem("Product Management", "/product-management", <Icon component={ProductManagement} />, [
    getItem("Categories", "/product-management/categories"),
    getItem("Product List", "/product-management/products"),
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
