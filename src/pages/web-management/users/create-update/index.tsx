import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Form, Input, Row, Space } from "antd";

import { useCreateUpdateUser } from "./create-update.action";
import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/models/form";

const { TextArea } = Input;

const CreateUpdate = () => {
  const { form, id, isLoading, navigate, onSubmit } = useCreateUpdateUser();

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
                title: "User List",
                href: "/web-management/users",
              },
              {
                title: `${id ? "Update" : "Add"} User`,
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
              {id ? "Update" : "Add"} User
            </div>
            <Divider
              style={{
                margin: "12px 0px 0px",
              }}
            />
          </div>
        </Space>
        <div>
          <Form onFinish={onSubmit} form={form}>
            <Form.Item
              {...fullLayout}
              label="Category Name"
              name="name"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Input placeholder="User name" />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Job"
              name="job"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <TextArea rows={4} placeholder="User Job" maxLength={300} showCount />
            </Form.Item>
            <Divider />

            <Row justify="end">
              <Space size="middle">
                <Button size="large" onClick={() => navigate("/web-management/users")}>
                  Cancel
                </Button>
                <Button type="primary" size="large" htmlType="submit" loading={isLoading}>
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
