import * as React from "react";

import { Layout, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import HeaderComponent from "./header";
import MenuComponent, { MenuList } from "./menu";
import TagsView from "./tagView";

import "./index.scss";

const { Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const token = theme.useToken();

  const location = useLocation();
  const [openKey, setOpenkey] = React.useState<string>();
  const [selectedKey, setSelectedKey] = React.useState<string>(location.pathname);
  const [menuList, setMenuList] = React.useState<MenuList>([]);
  const [collapsed, setCollapsed] = React.useState(false);
  const isMobile = false;

  function getStrTimesIndex(str: string, cha: string, num: number) {
    let x = str.indexOf(cha);

    for (let i = 0; i < num; i++) {
      x = str.indexOf(cha, x + 1);
    }

    return x;
  }

  function getFirstPathCode(path: string) {
    const index0 = getStrTimesIndex(path, "/", 0);
    const index1 = getStrTimesIndex(path, "/", 1);

    const activeKey = path.slice(index0 + 1, index1 > 0 ? index1 : path.length);

    return activeKey;
  }

  const toggle = () => setCollapsed(!collapsed);

  React.useEffect(() => {
    const code = getFirstPathCode(location.pathname);

    setOpenkey(code);
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  React.useEffect(() => {
    setMenuList([
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
    ]);
  }, []);

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />
      <Layout>
        <Sider
          className="layout-page-sider"
          trigger={null}
          collapsible
          style={{ backgroundColor: token.token.colorBgContainer }}
          collapsedWidth={isMobile ? 0 : 80}
          collapsed={collapsed}
          breakpoint="md"
        >
          <MenuComponent
            menuList={menuList}
            openKey={openKey}
            onChangeOpenKey={(k) => setOpenkey(k)}
            selectedKey={selectedKey}
            onChangeSelectedKey={(k) => setSelectedKey(k)}
          />
        </Sider>
        <Content className="layout-page-content">
          <TagsView />
          <React.Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </React.Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
