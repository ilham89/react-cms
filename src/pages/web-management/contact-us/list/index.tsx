import { Input, Row, Select, Space, Table, Tabs, TabsProps } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import { useGetContactUsService } from "@/services/contact-us/contact-us.hooks";
import { GetContactUsResponseType } from "@/services/contact-us/contact-us.types";

const ContactUs = () => {
  const { data, isLoading } = useGetContactUsService();

  const columns: ColumnsType<GetContactUsResponseType> = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => <>{dayjs(value).format("DD/MM/YYYY")}</>,
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text) => <div>{text.length > 40 ? text.slice(0, 40) + "..." : text}</div>,
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
            </Space>
          </Row>
        </div>
        <Table
          dataSource={data?.data}
          columns={columns}
          loading={isLoading}
          scroll={{ x: 800 }}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
};

export default ContactUs;
