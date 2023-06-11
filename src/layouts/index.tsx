import * as React from "react";

import { Drawer, Layout, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";

// import Breadcrumb from "./breadcrumb";
import HeaderComponent from "./header";
import MenuComponent from "./menu";
import TagsView from "./tagView";
import useUser from "@/stores/user";
import { getFirstPathCode } from "@/utils/getFirstPathCode";
import { getGlobalState } from "@/utils/getGlobal";

import "./index.scss";

const { Sider, Content } = Layout;
const WIDTH = 992;

const Dashboard: React.FC = () => {
  const token = theme.useToken();
  const location = useLocation();

  const [openKey, setOpenkey] = React.useState<string>();
  const [selectedKey, setSelectedKey] = React.useState<string>(location.pathname);

  const [menuList, device, collapsed, setUserItem] = useUser((state) => [
    state.menuList,
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
    const code = getFirstPathCode(location.pathname);

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
          >
            <MenuComponent
              menuList={menuList}
              openKey={openKey}
              onChangeOpenKey={(k) => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={(k) => setSelectedKey(k)}
            />
          </Sider>
        ) : (
          <Drawer
            width="200"
            placement="left"
            bodyStyle={{ padding: 0, height: "100%" }}
            closable={false}
            onClose={toggle}
            open={!collapsed}
          >
            <MenuComponent
              menuList={menuList}
              openKey={openKey}
              onChangeOpenKey={(k) => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={(k) => setSelectedKey(k)}
            />
          </Drawer>
        )}

        <Content className="layout-page-content">
          <div>
            <TagsView />
            {/* <Breadcrumb /> */}
          </div>

          <React.Suspense fallback={null}>
            <Outlet />
          </React.Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
