import React, { useEffect } from "react";

import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

import { MenuList } from "@/interfaces/layouts/menu.interface";
import useUser from "@/stores/user";

interface BreadcrumbItem {
  code: string;
  path?: string;
  label: string;
}

const { Item } = Breadcrumb;
let breadcrumbList: BreadcrumbItem[] = [];
let end = false;

const Index: React.FC = () => {
  const { pathname } = useLocation();

  const [menuList] = useUser((state) => [state.menuList]);

  // 根据pathname找出面包屑路径
  const getBreadcrumbByPathName = (
    menuList: MenuList,
    pathname: string,
    breadcrumbs: BreadcrumbItem[] = [],
  ) => {
    for (const menu of menuList) {
      const list: BreadcrumbItem[] = [];
      if (!end) {
        list.push({
          code: menu.code,
          path: menu.path,
          label: menu.label,
        });
        if (menu.path == pathname) {
          breadcrumbList = breadcrumbs.concat(list);
          end = true;
          break;
        } else if (menu.children) {
          getBreadcrumbByPathName(menu.children, pathname, breadcrumbs.concat(list));
        }
      }
    }
  };

  useEffect(() => {
    end = false;
    if (pathname === "/") getBreadcrumbByPathName(menuList, "/order-list");
    else getBreadcrumbByPathName(menuList, pathname);
  }, [pathname]);

  return (
    <Breadcrumb>
      {breadcrumbList.map((e) => {
        return <Item key={e.code}>{e.label}</Item>;
      })}
    </Breadcrumb>
  );
};

export default Index;
