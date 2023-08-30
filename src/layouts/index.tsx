import * as React from "react";

import { Drawer, Layout, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import HeaderComponent from "./header";
import MenuComponent from "./menu";
import useUser from "@/stores/user";
import { getGlobalState } from "@/utils/getGlobal";
import { getPathExceptLast } from "@/utils/string";

import "./index.scss";

const { Sider, Content } = Layout;
const WIDTH = 992;

const Dashboard: React.FC = () => {
  const token = theme.useToken();
  const location = useLocation();

  const [openKey, setOpenkey] = React.useState<string[]>(getPathExceptLast(location.pathname));
  const [selectedKey, setSelectedKey] = React.useState<string>(location.pathname);

  const [device, collapsed, setUserItem] = useUser((state) => [
    state.device,
    state.collapsed,
    state.setUserItem,
  ]);

  const isMobile = device === "MOBILE";

  const toggle = () => {
    setUserItem({
      collapsed: !collapsed,
    });
  };

  React.useEffect(() => {
    const code = getPathExceptLast(location.pathname);

    setOpenkey(code);
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  React.useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState();
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;

      setUserItem({
        device,
        collapsed: needCollapse,
      });
    };
  }, []);

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />
      <Layout>
        {!isMobile ? (
          <Sider
            className="layout-page-sider"
            trigger={null}
            collapsible
            style={{ backgroundColor: token.token.colorBgContainer }}
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="md"
            width={250}
          >
            <MenuComponent
              openKey={openKey}
              onChangeOpenKey={(k) => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={(k) => setSelectedKey(k)}
            />
          </Sider>
        ) : (
          <Drawer
            width={250}
            placement="left"
            bodyStyle={{ padding: 0, height: "100%" }}
            closable={false}
            onClose={toggle}
            open={!collapsed}
          >
            <MenuComponent
              openKey={openKey}
              onChangeOpenKey={(k) => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={(k) => setSelectedKey(k)}
            />
          </Drawer>
        )}

        <Content className="layout-page-content">
          <React.Suspense fallback={null}>
            <Outlet />
          </React.Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
