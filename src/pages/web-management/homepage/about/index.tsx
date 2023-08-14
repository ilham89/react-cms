import { Button, Divider, Form, Input, Row, Space, Tabs, TabsProps } from "antd";

import { useAbout } from "./about.action";
import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";

const { TextArea } = Input;

const About = () => {
  const { form, navigate, location, isLoading, onSubmit } = useAbout();

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
            label="About Section"
            name="about_section"
            className="required-form"
            rules={[{ required: true, message: <RequiredMessage /> }]}
          >
            <TextArea rows={4} placeholder="About section" maxLength={150} showCount />
          </Form.Item>
          <Divider />
          <Row justify="end">
            <Space size="middle">
              <Button size="large">Cancel</Button>
              <Button type="primary" size="large" htmlType="submit" loading={isLoading}>
                Save
              </Button>
            </Space>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default About;
