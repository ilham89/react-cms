import { useState } from "react";

import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Form, Input, Row, Select, Space, Switch } from "antd";
import { useNavigate } from "react-router-dom";

import { FormValues } from "./create-update.types";
import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";
import useNotification from "@/hooks/useNotification";
import { usePostFaqService } from "@/services/faq/faq.hooks";
import { FeaturedFaqEnum } from "@/services/faq/faq.types";
import { useGetFaqCategoriesService } from "@/services/faq-category/faq-category.hooks";
import { queryClient } from "@/utils/queryClient";

const { TextArea } = Input;

const CreateUpdate = () => {
  const [form] = Form.useForm<FormValues>();
  const navigate = useNavigate();

  const { data, isLoading: isLoadingCategories } = useGetFaqCategoriesService();
  const { mutate: createFaq } = usePostFaqService();
  const { addSuccess, addError } = useNotification();

  const [featured, setFeatured] = useState(false);

  const onFinish = (values: FormValues) => {
    const createPayload = {
      ...values,
      featured: featured ? FeaturedFaqEnum.Yes : FeaturedFaqEnum.No,
    };
    createFaq(createPayload, {
      onSuccess: () => {
        addSuccess("You`re changes are saved successfully");
        queryClient.invalidateQueries(["faqs"]);
        navigate("/web-management/faq");
      },
      onError: () => addError(),
    });
  };

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
                options={data?.data.map((item) => ({
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
                <Switch onChange={(checked) => setFeatured(checked)} />
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
              <TextArea rows={4} placeholder="Question Answer" maxLength={150} showCount />
            </Form.Item>
            <Divider />
            <Row justify="end">
              <Space size="middle">
                <Button size="large" onClick={() => navigate("/web-management/faq")}>
                  Cancel
                </Button>
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
