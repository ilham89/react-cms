import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Table, Tabs, TabsProps, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useLocation, useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  description: string;
  total: number;
  status: string;
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

const FaqCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dataSource = [
    {
      key: "1",
      name: "Mikeeeee",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, tenetur ab laboriosam eveniet veniam voluptatum sed dicta atque cupiditate doloremque blanditiis natus neque, ad inventore placeat officiis! Ad, ipsam doloremque!",
      total: 20,
      status: "active",
    },
    {
      key: "2",
      name: "John",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, tenetur ab laboriosam eveniet veniam voluptatum sed dicta atque cupiditate doloremque blanditiis natus neque, ad inventore placeat officiis! Ad, ipsam doloremque!",
      total: 20,
      status: "inactive",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },

    {
      title: "Short Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <div>{text.slice(0, 40) + "..."}</div>,
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
          <Dropdown menu={{ items }} placement="bottom" arrow>
            <Button className="btn-action" type="primary">
              Action
            </Button>
          </Dropdown>
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
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
};

export default FaqCategories;
