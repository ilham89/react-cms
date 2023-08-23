import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Form, Input, Row, Select, Space, Switch } from "antd";

import { useCreateUpdateFaq } from "./create-update.action";
import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";

const { TextArea } = Input;

const CreateUpdate = () => {
  const {
    form,
    id,
    navigate,
    faqCategories,
    isLoadingCategories,
    isLoadingSubmit,
    featured,
    onChangeFeatured,
    onFinish,
  } = useCreateUpdateFaq();

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
                title: `${id ? "Update" : "Add"} Question`,
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
              {id ? "Update" : "Add"} Question
            </div>
            <Divider
              style={{
                margin: "12px 0px 0px",
              }}
            />
          </div>
        </Space>
        <div>
          <Form onFinish={onFinish} form={form}>
            <Form.Item
              {...fullLayout}
              label="Question Name"
              name="question"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Input placeholder="Question name" />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Question Category"
              name="faq_category_id"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Select
                style={{
                  width: 205,
                }}
                showSearch
                placeholder="--Please select category--"
                options={faqCategories?.data.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                loading={isLoadingCategories}
              />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Featured Question"
              name="featured"
              className="required-form"
              valuePropName="checked"
            >
              <Space>
                <Switch onChange={onChangeFeatured} checked={featured} />
                <div>Featured is {featured ? "On" : "Off"}</div>
              </Space>
            </Form.Item>
            <Divider />

            <Form.Item
              {...fullLayout}
              label="Question Answer"
              name="answer"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <TextArea rows={4} placeholder="Question Answer" maxLength={300} showCount />
            </Form.Item>
            <Divider />
            <Row justify="end">
              <Space size="middle">
                <Button size="large" onClick={() => navigate("/web-management/faq")}>
                  Cancel
                </Button>
                <Button type="primary" size="large" htmlType="submit" loading={isLoadingSubmit}>
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
