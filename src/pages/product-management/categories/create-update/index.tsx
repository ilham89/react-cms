import React, { useState } from "react";

import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Col, Divider, Form, Input, Row, Space, Upload } from "antd";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";

import AddIcon from "@/assets/icons/add.svg";
import RequiredMessage from "@/components/RequiredMessage";
import useNotification from "@/hooks/useNotification";
import { useUploadRequest } from "@/hooks/useUploadRequest";
import { fullLayout } from "@/models/form";
import {
  useGetProductCategoryService,
  usePostProductCategoryService,
  usePutProductCategoryService,
} from "@/services/product-category/product-category.hooks";
import { StatusEnum } from "@/types/status";

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
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();

  const { file, setFile, onCustomRequest } = useUploadRequest();

  const { id } = params;

  const [customFields, setCustomFields] = useState([
    ...JSON.parse(JSON.stringify(baseCustomField)),
    ...JSON.parse(JSON.stringify(baseCustomField)),
    ...JSON.parse(JSON.stringify(baseCustomField)),
  ]);

  const { addError, addSuccess } = useNotification();
  const { mutate: create, isLoading: isLoadingCreate } = usePostProductCategoryService();
  const { mutate: update, isLoading: isLoadingUpdate } = usePutProductCategoryService();

  const { data } = useGetProductCategoryService(id as string, {
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

      // jika value additional info dari detail kosong
      if (Object.keys(data.additional_info).length === 0) return;

      const updatedDynamicFields = Object.keys(data.additional_info).map((key) => ({
        name: key,
        isUpdate: false,
        inputs: data.additional_info[key].map((value) => ({
          placeholder: `Input ${key}`,
          value: value,
        })),
      }));

      // jika value additional info dari detail = 3
      if (updatedDynamicFields.length === 3) return setCustomFields(updatedDynamicFields);

      // jika value additional info dari detail kurang dari 3
      const combinedFields = updatedDynamicFields.concat(customFields);

      // Buat objek untuk menyimpan data unik berdasarkan name
      const uniqueFields = {} as { [key: string]: boolean };

      // Filter elemen-elemen yang memiliki properti yang sama
      const mergedFields = combinedFields.filter((field) => {
        if (!uniqueFields[field.name]) {
          uniqueFields[field.name] = true;
          return true;
        }
        return false;
      });

      for (let i = 0; i < customFields.length - mergedFields.length; i++) {
        mergedFields.push(...baseCustomField);
      }

      setCustomFields(mergedFields);
    },
    refetchOnWindowFocus: false,
  });

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

  const getValueField = (data: CustomFieldValue[]) =>
    data?.map((datum) => datum.value)?.filter((datum) => datum !== "");

  const onSubmit = (values: FormValues) => {
    delete values.image;

    const payload = {
      ...values,
      image: file.file_name,
      additional_info: {
        [customFields[0]?.name]: getValueField(customFields[0]?.inputs),
        [customFields[1]?.name]: getValueField(customFields[1]?.inputs),
        [customFields[2]?.name]: getValueField(customFields[2]?.inputs),
      },
      status:
        id && data?.data.status === StatusEnum.Inactive ? StatusEnum.Inactive : StatusEnum.Active,
    };

    // eslint-disable-next-line
    // @ts-ignore
    delete payload.additional_info["Additional Information"];

    try {
      if (id) {
        update(
          { id: Number(id), data: payload },
          {
            onSuccess: () => {
              addSuccess("You`re changes are saved successfully");
              navigate("/product-management/categories");
            },
            onError: (error) => {
              const newError = error as AxiosError<{ error: string }>;
              addError(newError.response?.data?.error);
            },
          },
        );
      } else {
        create(payload, {
          onSuccess: () => {
            addSuccess("You`re changes are saved successfully");
            navigate("/product-management/categories");
          },
          onError: (error) => {
            const newError = error as AxiosError<{ error: string }>;
            addError(newError.response?.data?.error);
          },
        });
      }
    } catch {
      addError();
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
          <Form
            onFinish={onSubmit}
            form={form}
            initialValues={{
              size: [""],
              color: [""],
              material: [""],
            }}
          >
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
                          width: 170,
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
              <TextArea rows={4} placeholder="Short description" maxLength={300} showCount />
            </Form.Item>
            <Divider />
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
