import { CloudUploadOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Divider, Form, Input, Row, Space, Upload } from "antd";

import { useCreateUpdateHeroSection } from "./create-update.action";
import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/models/form";

const { TextArea } = Input;

const uploadButton = (
  <div
    style={{
      height: 170,
      aspectRatio: 16 / 9,
      background: "white",
      borderRadius: 12,
      border: "1px dashed #D2DDEC",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }}
  >
    <Space direction="vertical" align="center">
      <CloudUploadOutlined />
      <div
        style={{
          color: "#6C6C6C",
        }}
      >
        Drop files here to upload
      </div>
    </Space>
  </div>
);

const CreateUpdate = () => {
  const { form, navigate, id, file, onSubmit, isLoading, onCustomRequest } =
    useCreateUpdateHeroSection();

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
                title: "Hero Section",
                href: "/web-management/homepage/hero-section",
              },
              {
                title: `${id ? "Update" : "Add"} Banner`,
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
              {id ? "Update" : "Add"} Banner
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
              label="Banner Name"
              name="name"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Input placeholder="Banner name" />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Banner Description"
              name="description"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <TextArea rows={4} placeholder="Banner description" maxLength={300} showCount />
            </Form.Item>
            <Row>
              <Col span={6}>
                <Space direction="vertical">
                  <div>Banner Images*</div>
                  <ul
                    style={{
                      padding: "unset",
                      margin: "unset",
                      color: "#909090",
                    }}
                  >
                    <li>Recommended using (16:9) ration</li>
                    <li>Compatible file types (jpeg,png & svg)</li>
                  </ul>
                </Space>
              </Col>
              <Col span={16} offset={2}>
                <Form.Item
                  name="image"
                  className="required-form"
                  rules={[{ required: true, message: <RequiredMessage /> }]}
                >
                  <Upload
                    customRequest={({ file }) => onCustomRequest(file)}
                    showUploadList={false}
                  >
                    {Object.keys(file).length >= 1 ? (
                      <img
                        src={file.preview}
                        height={170}
                        width="100%"
                        alt="preview"
                        style={{
                          aspectRatio: 16 / 9,
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Divider />
            <Row justify="end">
              <Space size="middle">
                <Button
                  size="large"
                  onClick={() => navigate("/web-management/homepage/hero-section")}
                >
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
