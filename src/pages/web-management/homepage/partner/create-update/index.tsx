import { useState } from "react";

import { CloudUploadOutlined, RightOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";

import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";

const { TextArea } = Input;

const uploadButton = (
  <Space direction="vertical">
    <CloudUploadOutlined />
    <div
      style={{
        color: "#6C6C6C",
      }}
    >
      Drop files here to upload
    </div>
  </Space>
);

const CreateUpdate = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

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
                title: "Partner",
                href: "/web-management/homepage/partner",
              },
              {
                title: "Add Partner",
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
              Add Partner
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
              label="Partner Name"
              name="name"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Input placeholder="Partner name" />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Partner Description"
              name="description"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <TextArea rows={4} placeholder="Partner description" maxLength={150} showCount />
            </Form.Item>
            <Row>
              <Col span={6}>
                <Space direction="vertical">
                  <div>Partner Images*</div>
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
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                    style={{
                      border: "1px dashed #D2DDEC",
                      background: "white",
                    }}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
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
