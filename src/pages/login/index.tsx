import { Button, Form, Input, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import SolpacLogo from "@/assets/logo/solpac.png";
import useUser from "@/stores/user";

import "./index.scss";

const { Text } = Typography;

type Values = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const [setUserItem] = useUser((state) => [state.setUserItem]);

  const onFinish = (values: Values) => {
    navigate("/");
    setUserItem({
      logged: true,
    });
    console.log(values);
  };

  return (
    <div className="login-page">
      <div className="login-page-background">
        <div className="login-page-wrapper">
          <Space direction="vertical" size="middle">
            <Space
              direction="vertical"
              size={12}
              style={{
                textAlign: "center",
              }}
            >
              <img src={SolpacLogo} alt="logo" width={85} height={35} />
              <Text
                style={{
                  color: "#909090",
                }}
              >
                Enter your email address and password to access admin panel.
              </Text>
            </Space>
            <Form name="normal_login" onFinish={onFinish} layout="vertical">
              <Form.Item
                className="login-form"
                name="email"
                label="Email Address"
                rules={[{ required: true, type: "email" }]}
              >
                <Input size="large" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                className="login-form"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input.Password size="large" type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item className="login-form-button">
                <Button type="primary" block htmlType="submit" size="large">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Login;
