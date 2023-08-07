import { Button, Divider, Form, Input, Row, Space, Tabs, TabsProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";

interface IPostCreate {
  description: string;
  title: string;
}

const { TextArea } = Input;

const Cta = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const items: TabsProps["items"] = [
    {
      key: "/web-management/homepage/hero-section",
      label: "Hero Section",
    },
    {
      key: "/web-management/homepage/partner",
      label: "Partner",
    },
    {
      key: "/web-management/homepage/about",
      label: "About",
    },
    {
      key: "/web-management/homepage/cta",
      label: "CTA",
    },
  ];

  const onSubmit = (values: IPostCreate) => {
    console.log(values.description);
  };

  return (
    <div>
      <Space size="middle" direction="vertical" style={{ width: "100%" }}>
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          Homepage
        </div>
        <Tabs
          tabBarStyle={{ margin: 0 }}
          defaultActiveKey={location.pathname}
          items={items}
          onChange={(active) => navigate(active)}
        />
      </Space>
      <div
        style={{
          marginTop: 16,
        }}
      >
        <Form form={form} onFinish={onSubmit}>
          <Form.Item
            {...fullLayout}
            label="Title CTA"
            name="title"
            className="required-form"
            rules={[{ required: true, message: <RequiredMessage /> }]}
          >
            <Input placeholder="Title CTA" />
          </Form.Item>
          <Divider />
          <Form.Item
            {...fullLayout}
            label="CTA Description"
            name="description"
            className="required-form"
            rules={[{ required: true, message: <RequiredMessage /> }]}
          >
            <TextArea rows={4} placeholder="CTA description" maxLength={150} showCount />
          </Form.Item>
          <Divider />
          <Row justify="end">
            <Space size="middle">
              <Button size="large">Cancel</Button>
              <Button type="primary" size="large" htmlType="submit">
                Save
              </Button>
            </Space>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Cta;