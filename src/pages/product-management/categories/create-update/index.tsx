import React, { useState } from "react";

import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";
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

import AddIcon from "@/assets/icons/add.svg";
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

const baseCustomField = [
  {
    name: "Additional Information",
    isUpdate: false,
    inputs: [
      {
        placeholder: "Input information",
        value: "",
      },
      {
        placeholder: "Input information",
        value: "",
      },
    ],
  },
];
const CreateUpdate = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const [dynamicFields, setDynamicFields] = useState([
    {
      name: "Size",
      inputs: [
        {
          placeholder: "Input size",
          value: "",
        },
        {
          placeholder: "Input size",
          value: "",
        },
      ],
    },
    {
      name: "Color",
      inputs: [
        {
          placeholder: "Input color",
          value: "",
        },
        {
          placeholder: "Input color",
          value: "",
        },
      ],
    },
    {
      name: "Material",
      inputs: [
        {
          placeholder: "Input material",
          value: "",
        },
        {
          placeholder: "Input material",
          value: "",
        },
      ],
    },
  ]);

  const [customFields, setCustomField] = useState([
    ...JSON.parse(JSON.stringify(baseCustomField)),
    ...JSON.parse(JSON.stringify(baseCustomField)),
    ...JSON.parse(JSON.stringify(baseCustomField)),
  ]);

  const onChangeDynamicField = (
    index: number,
    childIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newDynamicField = [...dynamicFields];

    newDynamicField[index].inputs[childIndex].value = event.target.value;

    setDynamicFields(newDynamicField);
  };

  const addDynamicField = (index: number) => {
    const newDynamicField = [...dynamicFields];
    newDynamicField[index].inputs.push({
      ...newDynamicField[index].inputs[0],
      value: "",
    });

    setDynamicFields(newDynamicField);
  };

  const deleteDynamicField = (index: number, childIndex: number) => {
    const newDynamicField = [...dynamicFields];

    newDynamicField[index].inputs.splice(childIndex, 1);
    setDynamicFields(newDynamicField);
  };

  const onChangeCustomField = (
    index: number,
    childIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newCustomField = [...customFields];

    newCustomField[index].inputs[childIndex].value = event.target.value;

    setCustomField(newCustomField);
  };

  const addCustomField = (index: number) => {
    const newCustomField = [...customFields];
    newCustomField[index].inputs.push({
      ...newCustomField[index].inputs[0],
      value: "",
    });

    setCustomField(newCustomField);
  };

  const deleteCustomField = (index: number, childIndex: number) => {
    const newCustomField = [...customFields];

    newCustomField[index].inputs.splice(childIndex, 1);
    setCustomField(newCustomField);
  };

  const updateTitleCustomField = (index: number, e: React.ChangeEvent<HTMLInputElement> | null) => {
    const newCustomField = [...customFields];
    if (e) {
      newCustomField[index].name = e.target.value;
    } else {
      newCustomField[index].isUpdate = !newCustomField[index].isUpdate;
    }
    setCustomField(newCustomField);
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
                title: "Category List",
                href: "/product-management/categories",
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
            <Row>
              <Col span={6}>
                <Space direction="vertical">
                  <div>Category Images*</div>
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
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              {...fullLayout}
              label="Category Name"
              name="name"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Input placeholder="Category name" />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Short Description"
              name="description"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <TextArea rows={4} placeholder="Short description" maxLength={150} showCount />
            </Form.Item>
            {dynamicFields.map((field, index) => (
              <React.Fragment key={index}>
                <Row>
                  <Col span={6}>{field.name}*:</Col>
                  <Col span={16} offset={2}>
                    <Space direction="vertical">
                      {field.inputs.map((input, childIndex) => (
                        <Space key={childIndex}>
                          <Input
                            placeholder={input.placeholder}
                            value={input.value}
                            onChange={(e) => onChangeDynamicField(index, childIndex, e)}
                          />
                          {field.inputs.length > 1 && (
                            <DeleteOutlined onClick={() => deleteDynamicField(index, childIndex)} />
                          )}
                        </Space>
                      ))}
                      {field.inputs.length < 5 && (
                        <div
                          role="none"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                          onClick={() => addDynamicField(index)}
                        >
                          <img src={AddIcon} alt="add" width={16} height={16} />
                          <div>Add another {field.name.toLowerCase()}</div>
                        </div>
                      )}
                    </Space>
                  </Col>
                </Row>
                <Divider />
              </React.Fragment>
            ))}

            {customFields.map((field, index) => (
              <React.Fragment key={index}>
                <Row>
                  <Col span={6}>
                    <Space>
                      {field.isUpdate ? (
                        <Input
                          value={field.name}
                          placeholder="title"
                          onChange={(e) => updateTitleCustomField(index, e)}
                          onBlur={() => updateTitleCustomField(index, null)}
                        />
                      ) : (
                        <div>{field.name}</div>
                      )}
                      <EditOutlined onClick={() => updateTitleCustomField(index, null)} />
                    </Space>
                  </Col>
                  <Col span={16} offset={2}>
                    <Space direction="vertical">
                      {field.inputs.map(
                        (input: { placeholder: string; value: string }, childIndex: number) => (
                          <Space key={childIndex}>
                            <Input
                              placeholder={input.placeholder}
                              value={input.value}
                              onChange={(e) => onChangeCustomField(index, childIndex, e)}
                            />
                            {field.inputs.length > 1 && (
                              <DeleteOutlined
                                onClick={() => deleteCustomField(index, childIndex)}
                              />
                            )}
                          </Space>
                        ),
                      )}
                      {field.inputs.length < 5 && (
                        <div
                          role="none"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                          onClick={() => addCustomField(index)}
                        >
                          <img src={AddIcon} alt="add" width={16} height={16} />
                          <div>Add another information</div>
                        </div>
                      )}
                    </Space>
                  </Col>
                </Row>
                <Divider />
              </React.Fragment>
            ))}
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
