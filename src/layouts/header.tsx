import * as React from "react";

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, theme as antTheme } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import ChevronIcon from "@/assets/icons/chevron-down.svg";
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

  const [logged, setUserItem] = useUser((state) => [state.logged, state.setUserItem]);

  const toLogin = () => {
    navigate("/login");
    setUserItem({ logged: false });
    Cookies.remove("user_ct");
  };

  return (
    <Header
      className="layout-page-header bg-2"
      style={{ backgroundColor: token.token.colorBgContainer }}
    >
      <div className="logo" style={{ width: collapsed ? 80 : 250 }}>
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
                  src="https://res.cloudinary.com/ds73yosji/image/upload/v1692803403/solpac/Frame_1_lzqojw.png"
                  className="user-avator"
                  alt="avator"
                />
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    marginRight: 12,
                  }}
                >
                  Super Admin
                </div>
                <img src={ChevronIcon} alt="icon" />
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
