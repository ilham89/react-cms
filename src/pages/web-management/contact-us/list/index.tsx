import { Input, Row, Select, Space, Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import { useContactUs } from "./contact-us.action";
import Pagination from "@/components/Pagination";
import { pageSize } from "@/models/page";
import { contactManagement } from "@/models/tabs";
import type { GetContactUsResponseType } from "@/services/contact-us/contact-us.types";

const ContactUs = () => {
  const {
    data,
    page,
    limit,
    isLoading,
    onChangeLimit,
    onChangePage,
    onChangeSearchValue,
    onChangeTable,
  } = useContactUs();

  const columns: ColumnsType<GetContactUsResponseType> = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => <>{dayjs(value).format("DD/MM/YYYY")}</>,
      sorter: true,
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
        <Tabs tabBarStyle={{ margin: 0 }} defaultActiveKey="1" items={contactManagement} />
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
                options={pageSize}
                onChange={onChangeLimit}
              />
            </Space>
          </Row>
        </div>
        <Table
          onChange={onChangeTable}
          dataSource={data?.data}
          columns={columns}
          loading={isLoading}
          scroll={{ x: 800 }}
          rowKey={(record) => record.id}
          pagination={false}
          footer={() =>
            data && (
              <Pagination
                limit={limit}
                page={page}
                pageData={data.data.length}
                totalData={data.total_data}
                totalPage={data.total_page}
                paginationProps={{
                  onChange: onChangePage,
                }}
              />
            )
          }
        />
      </div>
    </div>
  );
};

export default ContactUs;
