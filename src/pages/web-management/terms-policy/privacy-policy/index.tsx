import { Button, Divider, Form, Row, Space, Tabs, TabsProps } from "antd";
import ReactQuill from "react-quill";

import { usePrivacyPolicy } from "./privacy-policy.action";
import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";
import { formats, modules } from "@/constans/react-quill";

const PrivacyPolicy = () => {
  const { form, location, navigate, isLoading, onSubmit } = usePrivacyPolicy();

  const items: TabsProps["items"] = [
    {
      key: "/web-management/terms-policy/terms-condition",
      label: "Terms and Condition",
    },
    {
      key: "/web-management/terms-policy/privacy-policy",
      label: "Privacy Policy",
    },
    {
      key: "/web-management/terms-policy/return-policy",
      label: "Return Policy",
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
          Terms & Policy
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
            label="Privacy Policy"
            name="privacy_policy"
            className="required-form"
            rules={[{ required: true, message: <RequiredMessage /> }]}
          >
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              placeholder="Quill WYSIWYG"
            />
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

export default PrivacyPolicy;
