import * as React from "react";

import { Button, Pagination, Row, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => <Link to={`/brands/${record.key}`}>{text}</Link>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button type="primary" ghost>
          Update
        </Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const Brands = () => {
  const [page, setPage] = React.useState(1);
  return (
    <div className="box-wrapper">
      <Row
        align="middle"
        justify="space-between"
        style={{
          margin: "8px 0px 16px",
        }}
      >
        <h2>Brands</h2>
        <Button type="primary">Create</Button>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 769 }}
        pagination={false}
        footer={() => (
          <Row align="middle" justify="space-between">
            <div>
              {data?.length === 0
                ? "No items found"
                : `Showing ${page == 1 ? 1 : (page - 1) * 10 + 1} - ${
                    page == 1 ? (page - 1) * 10 + data?.length : page * 10
                  } of ${data.length} items`}
            </div>
            <Pagination
              pageSize={10}
              total={data.length}
              onChange={(page) => setPage(page)}
              current={page}
              showSizeChanger={false}
            />
          </Row>
        )}
      />
    </div>
  );
};

export default Brands;
