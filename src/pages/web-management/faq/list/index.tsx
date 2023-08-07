import { useState } from "react";

import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
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
  featured: string;
  category: string;
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

const Faq = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  // const pagination = list?.data?.metadata;
  // const data = list?.data?.data;
  // const totalPage = Math.ceil(pagination?.total / pagination?.limit);

  const dataSource: DataType[] = [
    {
      key: "1",
      name: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, tenetur ab laboriosam eveniet veniam voluptatum sed dicta atque cupiditate doloremque blanditiis natus neque, ad inventore placeat officiis! Ad, ipsam doloremque!",
      featured: "Yes",
      category: "John",
      status: "active",
    },
    {
      key: "2",
      name: "Lorem, ipsum dolor ",
      featured: "No",
      category: "Mikeeeee",
      status: "inactive",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Question List",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => <div>{text.length > 40 ? text.slice(0, 40) + "..." : text}</div>,
    },

    {
      title: "Categories",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Featured Question",
      dataIndex: "featured",
      key: "featured",
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
          onClick={() => navigate("/web-management/faq/add")}
        >
          Add Question
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
              <Button icon={<DownloadOutlined />}>Download CSV</Button>
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
                pageSize={10}
                total={10}
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

export default Faq;
