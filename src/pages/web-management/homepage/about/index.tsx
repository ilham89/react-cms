import { Button, Divider, Form, Input, Row, Space, Tabs } from "antd";

import { useAbout } from "./about.action";
import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/models/form";
import { homeManagement } from "@/models/tabs";

const { TextArea } = Input;

const About = () => {
  const { form, navigate, location, isLoading, onSubmit } = useAbout();

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
          items={homeManagement}
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
            <TextArea rows={4} placeholder="About section" maxLength={300} showCount />
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
