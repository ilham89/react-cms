import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Form, Input, Row, Select, Space, Switch } from "antd";

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
                href: "/web-management/faq",
              },
              {
                title: "Add Question",
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
              Add Question
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
              label="Question Name"
              name="name"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Input placeholder="Question name" />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Question Category"
              name="category"
              className="required-form"
            >
              <Select
                style={{
                  width: 205,
                }}
                showSearch
                placeholder="--Please select category--"
                options={[
                  {
                    value: "wibu",
                    label: "Wibu",
                  },
                  {
                    value: "wota",
                    label: "Wota",
                  },
                ]}
              />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Featured Question"
              name="featured"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Space>
                <Switch />
                <div>Featured is On</div>
              </Space>
            </Form.Item>
            <Divider />

            <Form.Item
              {...fullLayout}
              label="Question Answer"
              name="answer"
              className="required-form"
            >
              <TextArea rows={4} placeholder="Question Answer" maxLength={150} showCount />
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
