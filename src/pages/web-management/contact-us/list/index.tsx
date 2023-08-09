import { DownloadOutlined } from "@ant-design/icons";
import { Button, Input, Row, Select, Space, Table, Tabs, TabsProps } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: Date | string;
}

const FaqCategories = () => {
  const dataSource: DataType[] = [
    {
      key: "1",
      name: "Mikeeeee",
      email: "ilham@gmail.com",
      phone: "+62 81357998228",
      message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis",
      date: new Date().toISOString(),
    },
    {
      key: "2",
      name: "John",
      email: "ilham@gmail.com",
      phone: "+62 81357998228",
      message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis",
      date: new Date().toISOString(),
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text.slice(0, 40) + "..."}</div>,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Contact Us",
    },
  ];

  return (
    <div>
      <Space size="middle" direction="vertical" style={{ width: "100%" }}>
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          Contact Us
        </div>
        <Tabs tabBarStyle={{ margin: 0 }} defaultActiveKey="1" items={items} />
      </Space>
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
            </Space>
          </Row>
        </div>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
};

export default FaqCategories;
