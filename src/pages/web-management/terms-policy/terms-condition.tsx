import { Button, Divider, Form, Row, Space, Tabs, TabsProps } from "antd";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";

import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";
import { formats, modules } from "@/constans/react-quill";

interface IPostCreate {
  terms_condition: string;
}

const TermsCondition = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

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

  const onSubmit = (values: IPostCreate) => {
    console.log(values.terms_condition);
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
            label="Terms and Condition"
            name="terms_condition"
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

export default TermsCondition;
