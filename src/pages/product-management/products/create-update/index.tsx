import { useState } from "react";

import { CloudUploadOutlined, RightOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
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
                title: "Product",
                href: "/product-management/products",
              },
              {
                title: "Add Product",
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
              Add Product
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
            <Row>
              <Col span={6}>
                <Space direction="vertical">
                  <div>Product Images*</div>
                  <ul
                    style={{
                      padding: "unset",
                      margin: "unset",
                      color: "#909090",
                    }}
                  >
                    <li>Recommended using (1:1) ration</li>
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
                    {fileList.length >= 5 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              {...fullLayout}
              label="Product Name"
              name="name"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Input placeholder="Product name" />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Product Category"
              name="category"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
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
              label="Product information"
              name="information"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <TextArea rows={4} placeholder="Product information" maxLength={150} showCount />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Product Description"
              name="description"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <TextArea rows={4} placeholder="Product description" maxLength={150} showCount />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Product Price"
              name="price"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <InputNumber addonAfter="each" placeholder="Input price" />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Order Minimum"
              name="min"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <InputNumber addonAfter="product" placeholder="Order minimum" />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Label product"
              name="label"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Select
                style={{
                  width: 205,
                }}
                showSearch
                placeholder="--Please select label--"
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
              label="Product Color"
              name="color"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Select
                style={{
                  width: 205,
                }}
                showSearch
                placeholder="--Please select color--"
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
              label="Product Size"
              name="size"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Select
                style={{
                  width: 205,
                }}
                showSearch
                placeholder="--Please select size--"
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
              label="Product Material"
              name="material"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Select
                style={{
                  width: 205,
                }}
                showSearch
                placeholder="--Please select material--"
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
              label="Product Brochure"
              name="brochure"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Upload name="file">
                <div
                  style={{
                    padding: "8px 16px",
                    background: "white",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <Space size={12}>
                    <Button type="primary">Choose</Button>
                    <div
                      style={{
                        color: "#2B2C30",
                      }}
                    >
                      No File Selected
                    </div>
                  </Space>
                </div>
              </Upload>
            </Form.Item>
            <Divider />

            <Form.Item
              {...fullLayout}
              label="Additional Information"
              name="information"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Select
                style={{
                  width: 205,
                }}
                showSearch
                placeholder="--Please select--"
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
