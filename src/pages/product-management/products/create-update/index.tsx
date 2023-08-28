import { Fragment, useRef, useState } from "react";

import {
  CloseOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  FileOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  InputRef,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { RcFile } from "antd/es/upload";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

import RequiredMessage from "@/components/RequiredMessage";
import { fullLayout } from "@/constans/form";
import useNotification from "@/hooks/useNotification";
import { imageServices } from "@/services/image/image.api";
import { productServices } from "@/services/product/product.api";
import {
  useGetProductService,
  usePostProductLabelsService,
  usePostProductService,
  usePutProductService,
} from "@/services/product/product.hooks";
import { productCategoryServices } from "@/services/product-category/product-category.api";
import { GetProductCategoryResponseType } from "@/services/product-category/product-category.types";
import { queryClient } from "@/utils/queryClient";

const { TextArea } = Input;

const uploadButton = (
  <div
    style={{
      height: 140,
      aspectRatio: 1,
      background: "white",
      borderRadius: 12,
      border: "1px dashed #D2DDEC",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      textAlign: "center",
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

export type File = {
  file_name: string;
  preview: string;
};

const defaultFiles = [
  {
    file_name: "",
    preview: "",
  },
  {
    file_name: "",
    preview: "",
  },
  {
    file_name: "",
    preview: "",
  },
  {
    file_name: "",
    preview: "",
  },
  {
    file_name: "",
    preview: "",
  },
];

type SelectField = {
  label: string;
  value: number;
};

const CreateUpdate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<File[]>(defaultFiles);
  const [brochure, setBrochure] = useState({} as File);
  const [categories, setCategories] = useState<SelectField[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);

  const { addError, addSuccess } = useNotification();
  const { mutate: create } = usePostProductService();
  const { mutate: update } = usePutProductService();

  const onSubmit = (values: any) => {
    delete values.image;

    const dataWithoutAdditionalInfo = [
      "name",
      "category_id",
      "information",
      "description",
      "price",
      "order_minimum",
      "label",
      "color",
      "size",
      "material",
      "brochure",
      "main_image",
      "images",
    ];

    const payload = {
      ...values,
      brochure: brochure.file_name,
      main_image: fileList[0].file_name,
      images: fileList.map((list) => list.file_name).filter((list) => list !== ""),
    };

    const additional_info = {} as any;

    for (const key in payload) {
      //eslint-disable-next-line
      if (payload.hasOwnProperty(key) && !dataWithoutAdditionalInfo.includes(key)) {
        additional_info[key] = payload[key];

        delete payload[key];
      }
    }

    const transformed = Object.keys(additional_info).map((key) => ({
      [key]: additional_info[key],
    }));

    const additional_info_payload = transformed.filter((item) => {
      // Menggunakan Object.values(item)[0] untuk mendapatkan array value pertama pada objek
      const values = Object.values(item)[0];
      return values?.length > 0; // Mengembalikan true jika panjang array value lebih dari 0
    });

    const newPayload = { ...payload, additional_info: [...additional_info_payload] };

    if (id) {
      update(
        {
          id: Number(id),
          data: newPayload,
        },
        {
          onSuccess: () => {
            addSuccess("You`re changes are saved successfully");
            navigate("/product-management/products");
          },
          onError: () => addError(),
        },
      );
    } else {
      create(newPayload, {
        onSuccess: () => {
          addSuccess("You`re changes are saved successfully");
          navigate("/product-management/products");
        },
        onError: () => addError(),
      });
    }
  };

  const onCustomRequest = (file: string | Blob | RcFile, index: number) => {
    const preview = URL.createObjectURL(file as Blob);
    const formData = new FormData();
    formData.append("file", file);

    imageServices
      .postImage(formData)
      .then((res) => {
        const newFiles = [...fileList];
        newFiles[index].file_name = res.data.file_name;
        newFiles[index].preview = preview;

        setFileList(newFiles);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          Cookies.remove("user_ct");
          addError("Your session is expired!");
          setTimeout(() => {
            location.replace("/login");
          }, 1000);
        }
      });
  };

  const onUploadBrochure = (file: string | Blob | RcFile) => {
    const formData = new FormData();
    formData.append("file", file);

    imageServices.postImage(formData).then(({ data }) => {
      setBrochure({
        file_name: data.file_name,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        preview: file.name,
      });
    });
  };

  const { data, isLoading } = useQuery(
    ["product-categories"],
    () =>
      productCategoryServices.getProductCategories({
        limit: 50,
        page: 1,
      }),
    {
      select: (data) => data.data,
      onSuccess: (data) => {
        setCategories(
          data.map((datum) => ({
            label: datum.name,
            value: datum.id,
          })),
        );
      },
    },
  );

  const { data: productLabels, isLoading: isLoadingProductLabel } = useQuery(
    ["product-labels"],
    () => productServices.getLabelProduct(),
    {
      select: ({ data }) => data,
    },
  );

  const { mutate: deleteLabel, isLoading: isLoadingDeleteLabel } = useMutation((id: number) =>
    productServices.deleteLabelProduct(id),
  );

  const inputRef = useRef<InputRef>(null);

  const { mutate: createLabel } = usePostProductLabelsService();

  const addItem = () => {
    createLabel(
      { name: inputRef.current?.input?.value || "" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["product-labels"]);
        },
        onError: (error: any) => addError(error?.response?.data.error[0]),
      },
    );
  };

  useGetProductService(id as string, {
    enabled: !!id,
    onSuccess: ({ data }) => {
      const additional_info = {} as { [key: string]: string };

      data.additional_info.forEach((info) => {
        const key = Object.keys(info)[0]; // Ambil kunci dari objek
        const value = info[key]; // Ambil nilai dari objek
        additional_info[key] = value; // Tambahkan pasangan kunci dan nilai ke dalam objek additional_info
      });

      form.setFieldsValue({
        name: data.name,
        category_id: data.category_id,
        information: data.information,
        description: data.description,
        price: data.price,
        order_minimum: data.order_minimum,
        label: data.label,
        color: data.color,
        material: data.material,
        size: data.size,
        image: data.main_image,
        brochure: data.brochure,
        ...additional_info,
      });

      const newFileList = data.images.map((name, index) => ({
        file_name: name,
        preview: data.images_url[index],
      }));

      for (let i = 0; i < defaultFiles.length - data.images.length; i++) {
        newFileList.push(JSON.parse(JSON.stringify(defaultFiles[0])));
      }

      // local state
      setSelectedCategory(data.category_id);
      setFileList(newFileList);

      if (data.brochure) {
        setBrochure({
          file_name: data.brochure,
          preview: data.brochure_url,
        });
      }
    },
    refetchOnWindowFocus: false,
  });

  const categoryIndex = (data as GetProductCategoryResponseType[])?.findIndex(
    (datum) => datum.id === selectedCategory,
  );
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
                title: `${id ? "Update" : "Add"} Product`,
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
              {id ? "Update" : "Add"} Product
            </div>
            <Divider
              style={{
                margin: "12px 0px 0px",
              }}
            />
          </div>
        </Space>
        <div>
          <Form form={form} onFinish={onSubmit}>
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
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {fileList.map((file, index) => (
                      <Upload
                        key={index}
                        customRequest={({ file }) => onCustomRequest(file, index)}
                        showUploadList={false}
                        accept="image/*"
                      >
                        {file.preview ? (
                          <div
                            style={{
                              position: "relative",
                            }}
                          >
                            <img
                              src={file.preview}
                              height={140}
                              width="100%"
                              alt="preview"
                              style={{
                                aspectRatio: 1,
                                objectFit: "cover",
                                borderRadius: 12,
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                padding: "0px 4px",
                                background: "white",
                                borderRadius: 4,
                                cursor: "pointer",
                              }}
                              role="none"
                              onClick={(e) => {
                                e.stopPropagation();
                                const newFileList = [...fileList];
                                newFileList[index].file_name = "";
                                newFileList[index].preview = "";
                                setFileList(newFileList);

                                if (newFileList.every((file) => !file.file_name)) {
                                  form.setFieldValue("image", "");
                                }
                              }}
                            >
                              <DeleteOutlined />
                            </div>
                          </div>
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    ))}
                  </div>
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
              name="category_id"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <Select
                style={{
                  width: 205,
                }}
                showSearch
                placeholder="--Please select category--"
                loading={isLoading}
                options={categories}
                onSelect={(value) => {
                  setSelectedCategory(value);
                  form.setFieldsValue({
                    color: [],
                    size: [],
                    material: [],
                  });
                }}
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
              <TextArea rows={4} placeholder="Product information" maxLength={300} showCount />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Product Description"
              name="description"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <TextArea rows={4} placeholder="Product description" maxLength={300} showCount />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Product Price"
              name="price"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <InputNumber
                addonAfter="each"
                placeholder="Input price"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
            <Divider />
            <Form.Item
              {...fullLayout}
              label="Order Minimum"
              name="order_minimum"
              className="required-form"
              rules={[{ required: true, message: <RequiredMessage /> }]}
            >
              <InputNumber
                addonAfter="product"
                placeholder="Order minimum"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              />
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
                value={selectedLabel}
                mode="multiple"
                menuItemSelectedIcon={null}
                placeholder="--Please select label--"
                loading={isLoadingProductLabel || isLoadingDeleteLabel}
                optionLabelProp="label"
                onChange={setSelectedLabel}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input placeholder="Please enter label" ref={inputRef} />
                      <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                        Add item
                      </Button>
                    </Space>
                  </>
                )}
              >
                {productLabels
                  ?.filter((d) => !selectedLabel.includes(d.name))
                  ?.map((label) => (
                    <Select.Option key={label.name} value={label.name} label={label.name}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>{label.name}</div>
                        <CloseOutlined
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteLabel(label.id, {
                              onSuccess: () => queryClient.invalidateQueries(["product-labels"]),
                              onError: () => addError(),
                            });
                          }}
                        />
                      </div>
                    </Select.Option>
                  ))}
              </Select>
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
                mode="multiple"
                allowClear
                showSearch
                menuItemSelectedIcon={null}
                placeholder="--Please select color--"
                options={data?.[
                  data.findIndex((datum) => datum.id === selectedCategory)
                ]?.color?.map((color) => ({
                  label: color,
                  value: color,
                }))}
                disabled={selectedCategory === -1}
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
                mode="multiple"
                allowClear
                showSearch
                menuItemSelectedIcon={null}
                placeholder="--Please select size--"
                options={data?.[
                  data.findIndex((datum) => datum.id === selectedCategory)
                ]?.size?.map((size) => ({
                  label: size,
                  value: size,
                }))}
                disabled={selectedCategory === -1}
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
                mode="multiple"
                allowClear
                showSearch
                menuItemSelectedIcon={null}
                placeholder="--Please select material--"
                options={data?.[
                  data.findIndex((datum) => datum.id === selectedCategory)
                ]?.material?.map((material) => ({
                  label: material,
                  value: material,
                }))}
                disabled={selectedCategory === -1}
              />
            </Form.Item>
            <Divider />
            <Form.Item {...fullLayout} label="Product Brochure" name="brochure">
              <Upload
                customRequest={({ file }) => onUploadBrochure(file)}
                showUploadList={false}
                accept="application/pdf, image/*"
              >
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
              {Object.keys(brochure).length > 0 && (
                <Space>
                  <FileOutlined />
                  <a href={brochure.preview} download target="_blank" rel="noreferrer">
                    {brochure.file_name}
                  </a>
                  <DeleteOutlined
                    onClick={() => {
                      setBrochure({} as File);
                      form.setFieldValue("brochure", "");
                    }}
                  />
                </Space>
              )}
            </Form.Item>
            <Divider />

            {selectedCategory !== -1 && categoryIndex !== -1 && (
              <>
                {Object.entries(
                  (data as GetProductCategoryResponseType[])[categoryIndex].additional_info,
                ).map(([key, value]) => (
                  <Fragment key={key}>
                    <Form.Item {...fullLayout} label={key} name={key}>
                      <Select
                        style={{
                          width: 205,
                        }}
                        mode="multiple"
                        allowClear
                        showSearch
                        menuItemSelectedIcon={null}
                        placeholder="--Please select--"
                        options={value.map((d) => ({ label: d, value: d }))}
                      />
                    </Form.Item>
                    <Divider />
                  </Fragment>
                ))}
              </>
            )}

            <Row justify="end">
              <Space size="middle">
                <Button size="large" onClick={() => navigate("/product-management/products")}>
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
