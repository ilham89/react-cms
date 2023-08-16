import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useLocation, useNavigate } from "react-router-dom";

import { useDebounce } from "@/hooks/useDebounce";
import { productServices } from "@/services/product/product.api";
import { GetProductResponseType } from "@/services/product/product.types";

enum Status {
  Active = "Active",
  Inactive = "Inactive",
}

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Active
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Inactive
      </a>
    ),
  },
];

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const debounceSearchValue = useDebounce(searchValue);

  const { data, isLoading } = useQuery(["products", page, limit, debounceSearchValue], () =>
    productServices.getProducts({
      limit,
      page,
      q: debounceSearchValue,
      order_by: "",
      order_field: "name",
    }),
  );

  const onChangePage = (value: number) => setPage(value);
  const onChangeLimit = (value: number) => setLimit(value);
  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearchValue(e.target.value);
  };

  const columns: ColumnsType<GetProductResponseType> = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },

    {
      title: "Categories",
      dataIndex: "ProductCategory",
      key: "ProductCategory",
      render: (value) => <>{value.name}</>,
    },
    {
      title: "Product Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (value) => (
        <Tag bordered={false} color={value === Status.Active ? "success" : "error"}>
          {value}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "key",
      render: () => (
        <Space>
          <Button type="primary" className="btn-update">
            Edit
          </Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const tabs: TabsProps["items"] = [
    {
      key: "/product-management/categories",
      label: "Category List",
    },
    {
      key: "/product-management/products",
      label: "Product List",
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          Product
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => navigate("/product-management/products/add")}
        >
          Add Product
        </Button>
      </div>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        defaultActiveKey={location.pathname}
        items={tabs}
        onChange={(active) => navigate(active)}
      />
      <div
        className="box-wrapper"
        style={{
          marginTop: 16,
        }}
      >
        <div
          style={{
            padding: 16,
          }}
        >
          <Row justify="space-between">
            <Space size={12}>
              <div
                style={{
                  color: "#464848",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Search:
              </div>
              <Input
                placeholder="Search something here"
                allowClear
                onChange={onChangeSearchValue}
              />
            </Space>
            <Space>
              <Select
                defaultValue={5}
                bordered={false}
                options={[
                  { value: 5, label: "5 / page" },
                  { value: 10, label: "10 / page" },
                  { value: 20, label: "20 / page" },
                ]}
                onChange={onChangeLimit}
              />
              <Dropdown menu={{ items }} arrow placement="bottomRight">
                <Button>Filter | 0</Button>
              </Dropdown>
            </Space>
          </Row>
        </div>
        <Table
          dataSource={data?.data}
          loading={isLoading}
          columns={columns}
          scroll={{ x: 800 }}
          pagination={false}
          rowKey={(record) => record.id}
          footer={() => (
            <Row align="middle" justify="space-between">
              {data && (
                <div className="pd__inventory-list__pagination-info">
                  {data.data.length === 0
                    ? "No items found"
                    : `Showing ${page == 1 ? 1 : (page - 1) * data.page_limit + 1} to ${
                        page == data.total_page
                          ? (page - 1) * data.page_limit + data.data.length
                          : page * data.page_limit
                      } of ${data.total_data} entries`}
                </div>
              )}
              <Pagination
                pageSize={limit}
                total={data?.total_data}
                onChange={onChangePage}
                current={page}
                showSizeChanger={false}
              />
            </Row>
          )}
        />
      </div>
    </div>
  );
};

export default Products;
