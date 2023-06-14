import * as React from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

import useUser from "@/stores/user";
import "./index.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [setUserItem] = useUser((state) => [state.setUserItem]);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    navigate("/");
    setUserItem({
      logged: true,
    });
  };

  return (
    <div className="login-page">
      <div className="login-page-wrapper">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <h2>REACT ANTD ADMIN</h2>

          <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
