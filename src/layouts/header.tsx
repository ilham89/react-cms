import * as React from "react";

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Typography, theme as antTheme } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import ChevronIcon from "@/assets/icons/chevron-down.svg";
import useUser from "@/stores/user";

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

const { Header } = Layout;
const { Title } = Typography;

const HeaderComponent: React.FC<HeaderProps> = ({ collapsed, toggle }) => {
  const token = antTheme.useToken();
  const navigate = useNavigate();

  const [logged, setUserItem, username] = useUser((state) => [
    state.logged,
    state.setUserItem,
    state.username,
  ]);

  const toLogin = () => {
    Cookies.remove("user_ct");
    setUserItem({ logged: false });
    navigate("/login");
  };

  return (
    <Header
      className="layout-page-header bg-2"
      style={{ backgroundColor: token.token.colorBgContainer }}
    >
      <div className="logo" style={{ width: collapsed ? 80 : 250 }}>
        <img
          src="https://res.cloudinary.com/ds73yosji/image/upload/v1696909397/ant-design-icon-512x512-ncocfg8e_cfjydh.png"
          alt="logo"
          width={60}
          height={40}
          style={{
            objectFit: "contain",
          }}
        />
        {!collapsed && <Title level={4}>Antd CMS</Title>}
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
                  src="https://res.cloudinary.com/ds73yosji/image/upload/v1696909397/ant-design-icon-512x512-ncocfg8e_cfjydh.png"
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
                  {username}
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
