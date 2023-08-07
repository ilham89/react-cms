import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Form, Input, Row, Space } from "antd";

import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";

const { TextArea } = Input;

const CreateUpdate = () => {
  return (
    <div>
      <Space
        direction="vertical"
        size="large"
        style={{
          width: "100%",
        }}
      >
        <Space
          direction="vertical"
          size={12}
          style={{
            width: "100%",
          }}
        >
          <Breadcrumb
            separator={<RightOutlined />}
            items={[
              {
                title: "FAQ",
                href: "/web-management/faq/categories",
              },
              {
                title: "Add Category",
              },
            ]}
          />
          <div style={{ width: "100%" }}>
            <div
              style={{
                color: "#2B2C30",
                fontSize: 30,
                fontWeight: 600,
              }}
            >
              Add Category
            </div>
            <Divider
              style={{
                margin: "12px 0px 0px",
              }}
            />
          </div>
        </Space>
        <div>
          <Form>
            <Form.Item
              {...fullLayout}
              label="Category Name"
              name="name"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Input placeholder="Basic usage" />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Short Description"
              name="description"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={150} showCount />
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
      </Space>
    </div>
  );
};

export default CreateUpdate;