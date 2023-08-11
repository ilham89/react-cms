import { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
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

interface DataType {
  key: string;
  name: string;
  size: string;
  category: string;
  price: string;
  label: string;
}

enum Status {
  Active = "active",
  Inactive = "inactive",
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
  // const pagination = list?.data?.metadata;
  // const data = list?.data?.data;
  // const totalPage = Math.ceil(pagination?.total / pagination?.limit);

  const dataSource: DataType[] = [
    {
      key: "1",
      name: "Pizza",
      size: "12x40x20",
      category: "John",
      price: "$ 20 each",
      label: "Customize",
    },
    {
      key: "2",
      name: "Pizza",
      size: "12x40x20",
      category: "John",
      price: "$ 20 each",
      label: "Plain",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },

    {
      title: "Categories",
      dataIndex: "category",
      key: "category",
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
              <Input placeholder="Search something here" allowClear />
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
              />
              <Dropdown menu={{ items }} arrow placement="bottomRight">
                <Button>Filter | 0</Button>
              </Dropdown>
            </Space>
          </Row>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          footer={() => (
            <Row align="middle" justify="space-between">
              <div className="pd__inventory-list__pagination-info">
                {/* {data?.length === 0
                ? "No items found"
                : `Showing ${page == 1 ? 1 : (page - 1) * pagination?.limit + 1} - ${
                    page == totalPage
                      ? (page - 1) * pagination?.limit + data?.length
                      : page * pagination?.limit
                  } of ${pagination?.total} items`} */}
                No items found
              </div>
              <Pagination
                pageSize={5}
                total={5}
                onChange={(page) => setPage(page)}
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
