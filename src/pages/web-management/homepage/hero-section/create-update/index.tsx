import { useState } from "react";

import { CloudUploadOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Divider, Form, Input, Row, Space, Upload } from "antd";

import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";
import { imageServices } from "@/services/image/image.api";

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

type file = {
  file_name: string;
};

type FormValues = {
  name: string;
  description: string;
  image: string;
};

const CreateUpdate = () => {
  const [fileList, setFileList] = useState<file[]>([]);

  const onSubmit = (values: FormValues) => {
    // let data = new FormData();
    // data.append('image', values.image.file);
    console.log(values, "valuess");
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
                title: "Hero Section",
                href: "/web-management/homepage/hero-section",
              },
              {
                title: "Add Banner",
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
              Add Banner
            </div>
            <Divider
              style={{
                margin: "12px 0px 0px",
              }}
            />
          </div>
        </Space>
        <div>
          <Form onFinish={onSubmit}>
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
              <TextArea rows={4} placeholder="Banner description" maxLength={150} showCount />
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
                    customRequest={({ file }) => {
                      const formData = new FormData();
                      formData.append("file", file);

                      imageServices
                        .postImage(formData)
                        .then((res) => setFileList([...fileList, res.data]))
                        .catch((err) => console.log(err));
                    }}
                    showUploadList={false}
                  >
                    {fileList.length >= 1 ? <div>udah keupload</div> : uploadButton}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

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
