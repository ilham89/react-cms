import React, { useState } from "react";

import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Col, Divider, Form, Input, Row, Space, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useNavigate, useParams } from "react-router-dom";

import AddIcon from "@/assets/icons/add.svg";
import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";
import useNotification from "@/hooks/useNotification";
import { imageServices } from "@/services/image/image.api";
import {
  useGetProductCategoryService,
  usePostProductCategoryService,
  usePutProductCategoryService,
} from "@/services/product-category/product-category.hooks";
import { ProductCategoryStatusEnum } from "@/services/product-category/product-category.types";

const { TextArea } = Input;

const uploadButton = (
  <div
    style={{
      height: 170,
      aspectRatio: 1,
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

export type File = {
  file_name: string;
  preview: string;
};

export type CustomFieldValue = {
  placeholder: string;
  value: string;
};

export type FormValues = {
  name: string;
  short_description: string;
  image?: string;
};

const CreateUpdate = () => {
  const [file, setFile] = useState({} as File);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;

  const { addError, addSuccess } = useNotification();
  const { mutate: create, isLoading: isLoadingCreate } = usePostProductCategoryService();
  const { mutate: update, isLoading: isLoadingUpdate } = usePutProductCategoryService();

  useGetProductCategoryService(id as string, {
    enabled: !!id,
    onSuccess: ({ data }) => {
      form.setFieldsValue({
        image: data.image,
        name: data.name,
        short_description: data.short_description,
      });

      setFile({
        preview: data.image_url,
        file_name: data.image,
      });

      const updatedFields = dynamicFields.map((field) => {
        if (field.name === "Size") {
          const newInputs = data.size.map((value) => ({
            placeholder: "Input size",
            value: value,
          }));

          return {
            ...field,
            inputs: newInputs,
          };
        }

        if (field.name === "Color") {
          const newInputs = data.color.map((value) => ({
            placeholder: "Input color",
            value: value,
          }));

          return {
            ...field,
            inputs: newInputs,
          };
        }

        if (field.name === "Material") {
          const newInputs = data.material.map((value) => ({
            placeholder: "Input material",
            value: value,
          }));

          return {
            ...field,
            inputs: newInputs,
          };
        }
        return field;
      });

      const updatedDynamicFields = Object.keys(data.additional_info).map((key) => ({
        name: key,
        inputs: data.additional_info[key].map((value) => ({
          placeholder: `Input ${key}`,
          value: value,
        })),
      }));

      setDynamicFields(updatedFields);

      setCustomFields(updatedDynamicFields);
    },
  });

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

  const [customFields, setCustomFields] = useState([
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

    setCustomFields(newCustomField);
  };

  const addCustomField = (index: number) => {
    const newCustomField = [...customFields];
    newCustomField[index].inputs.push({
      ...newCustomField[index].inputs[0],
      value: "",
    });

    setCustomFields(newCustomField);
  };

  const deleteCustomField = (index: number, childIndex: number) => {
    const newCustomField = [...customFields];

    newCustomField[index].inputs.splice(childIndex, 1);
    setCustomFields(newCustomField);
  };

  const updateTitleCustomField = (index: number, e: React.ChangeEvent<HTMLInputElement> | null) => {
    const newCustomField = [...customFields];
    if (e) {
      newCustomField[index].name = e.target.value;
    } else {
      newCustomField[index].isUpdate = !newCustomField[index].isUpdate;
    }
    setCustomFields(newCustomField);
  };

  const onCustomRequest = (file: string | Blob | RcFile) => {
    const preview = URL.createObjectURL(file as Blob);
    const formData = new FormData();
    formData.append("file", file);

    imageServices
      .postImage(formData)
      .then((res) =>
        setFile({
          file_name: res.data.file_name,
          preview,
        }),
      )
      .catch(() => addError());
  };

  const getValueField = (data: CustomFieldValue[]) =>
    data.map((datum) => datum.value).filter((datum) => datum !== "");

  const onSubmit = (values: FormValues) => {
    delete values.image;

    const payload = {
      ...values,
      image: file.file_name,
      size: getValueField(dynamicFields[0].inputs),
      color: getValueField(dynamicFields[1].inputs),
      material: getValueField(dynamicFields[2].inputs),
      additional_info: {
        [customFields[0].name]: getValueField(customFields[0].inputs),
        [customFields[1].name]: getValueField(customFields[1].inputs),
        [customFields[2].name]: getValueField(customFields[2].inputs),
      },
      status: ProductCategoryStatusEnum.Active,
    };

    if (id) {
      update(
        { id: Number(id), data: payload },
        {
          onSuccess: () => {
            addSuccess("You`re changes are saved successfully");
            navigate("/product-management/categories");
          },
          onError: () => addError(),
        },
      );
    } else {
      create(payload, {
        onSuccess: () => {
          addSuccess("You`re changes are saved successfully");
          navigate("/product-management/categories");
        },
        onError: () => addError(),
      });
    }
  };

  const isLoading = isLoadingCreate || isLoadingUpdate;

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
                title: `${id ? "Update" : "Add"} Category`,
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
              {id ? "Update" : "Add"} Category
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
                          aspectRatio: 1,
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
              name="short_description"
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
                <Button size="large" onClick={() => navigate("/product-management/categories")}>
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
