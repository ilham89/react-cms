import * as React from "react";

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, theme as antTheme } from "antd";
import { useNavigate } from "react-router-dom";

import LogoOnly from "@/assets/logo/logo-only.png";
import SolpacLogo from "@/assets/logo/solpac.png";
import useUser from "@/stores/user";

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

const { Header } = Layout;

const HeaderComponent: React.FC<HeaderProps> = ({ collapsed, toggle }) => {
  const token = antTheme.useToken();
  const navigate = useNavigate();

  const [logged] = useUser((state) => [state.logged]);

  const toLogin = () => {
    navigate("/login");
  };

  return (
    <Header
      className="layout-page-header bg-2"
      style={{ backgroundColor: token.token.colorBgContainer }}
    >
      <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
        <img src={collapsed ? LogoOnly : SolpacLogo} alt="logo" width={100} height={40} />
      </div>
      <div className="layout-page-header-main">
        <div onClick={toggle} role="none">
          <span id="sidebar-trigger">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className="actions">
          {logged ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    icon: <UserOutlined />,
                    label: (
                      <span role="none" onClick={() => navigate("/dashboard")}>
                        Account
                      </span>
                    ),
                  },
                  {
                    key: "2",
                    icon: <LogoutOutlined />,
                    label: (
                      <span role="none" onClick={toLogin}>
                        Logout
                      </span>
                    ),
                  },
                ],
              }}
            >
              <span className="user-action">
                <img
                  src="https://res.cloudinary.com/ds73yosji/image/upload/v1678074667/gemilang/354072278ea3016361f1453d9659c212_bei0uy.jpg"
                  className="user-avator"
                  alt="avator"
                />
              </span>
            </Dropdown>
          ) : (
            <LogoutOutlined onClick={toLogin} />
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
