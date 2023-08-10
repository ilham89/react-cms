import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Table, Tabs, TabsProps, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useLocation, useNavigate } from "react-router-dom";

import { useGetFaqCategoriesService } from "@/services/faq-category/faq-category.hooks";
import {
  FaqCategoryResponseType,
  FaqCategoryStatusEnum,
} from "@/services/faq-category/faq-category.types";

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

const FaqCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useGetFaqCategoriesService();

  const columns: ColumnsType<FaqCategoryResponseType> = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      sorter: (a, b) => a.name.length - b.name.length,
    },

    {
      title: "Short Description",
      dataIndex: "short_description",
      key: "short_description",
      render: (text) => <div>{text.length > 40 ? text.slice(0, 40) + "..." : text}</div>,
    },
    {
      title: "Total FAQ Registered",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <Tag bordered={false} color={value === FaqCategoryStatusEnum.Active ? "success" : "error"}>
          {value}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value) => (
        <Space>
          <Dropdown menu={{ items }} placement="bottom" arrow>
            <Button className="btn-action" type="primary">
              Action
            </Button>
          </Dropdown>
          <Button
            type="primary"
            className="btn-update"
            onClick={() => navigate(`/web-management/faq/categories/${value}`)}
          >
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
      key: "/web-management/faq/categories",
      label: "Category List",
    },
    {
      key: "/web-management/faq",
      label: "FAQ List",
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
          FAQ
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => navigate("/web-management/faq/categories/add")}
        >
          Add Categories
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
            fontWeight: 600,
            padding: "16px",
            fontSize: 16,
          }}
        >
          Category List
        </div>
        <Table
          dataSource={data?.data}
          loading={isLoading}
          columns={columns}
          scroll={{ x: 800 }}
          pagination={false}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
};

export default FaqCategories;
