import { useState } from "react";

import { Button, Divider, Form, Row, Space, Tabs, TabsProps } from "antd";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";

import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";
import { formats, modules } from "@/constans/react-quill";
import useNotification from "@/hooks/useNotification";
import {
  useGetWebManagementsService,
  usePostWebManagementService,
  usePutWebManagementService,
} from "@/services/web-management/web-management.hooks";

interface IPostCreate {
  terms_condition: string;
}

const TermsCondition = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { addError, addSuccess } = useNotification();
  const [indexPage, setIndexPage] = useState(-1);

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

  const { data } = useGetWebManagementsService({
    onSuccess: ({ data }) => {
      const indexPage = data.findIndex((datum) => datum.name === "Terms and Condition");
      setIndexPage(indexPage);

      if (indexPage === -1) return;
      form.setFieldValue("terms_condition", data[indexPage].description);
    },
  });

  const { mutate: create, isLoading: isLoadingCreate } = usePostWebManagementService();
  const { mutate: update, isLoading: isLoadingUpdate } = usePutWebManagementService();

  const isLoading = isLoadingCreate || isLoadingUpdate;

  const onSubmit = (values: IPostCreate) => {
    if (indexPage === -1) {
      const createPayload = {
        name: "Terms and Condition",
        description: values.terms_condition,
      };
      create(createPayload, {
        onSuccess: () => {
          addSuccess("You`re changes are saved successfully");
        },
        onError: () => addError(),
      });
    } else {
      const updatePayload = {
        id: data?.data[indexPage].id as number,
        data: {
          description: values.terms_condition,
        },
      };
      update(updatePayload, {
        onSuccess: () => {
          addSuccess("You`re changes are saved successfully");
        },
        onError: () => addError(),
      });
    }
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

export default TermsCondition;
