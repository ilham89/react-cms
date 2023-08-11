import { useState } from "react";

import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  Modal,
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

import useNotification from "@/hooks/useNotification";
import { useDeleteFaqService, useGetFaqsService } from "@/services/faq/faq.hooks";
import { GetFaqResponseType } from "@/services/faq/faq.types";
import { queryClient } from "@/utils/queryClient";

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
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);

  const { data, isLoading: isLoadingFaqs } = useGetFaqsService();
  const { mutate: deleteFaq, isLoading: isLoadingDelete } = useDeleteFaqService();
  const { addError, addSuccess } = useNotification();
  // const pagination = list?.data?.metadata;
  // const data = list?.data?.data;
  // const totalPage = Math.ceil(pagination?.total / pagination?.limit);

  const onOpenModal = (id: number) => setSelectedCategory(id);
  const onCloseModal = () => setSelectedCategory(-1);

  const onDeleteFaq = () =>
    deleteFaq(selectedCategory, {
      onSuccess: () => {
        queryClient.invalidateQueries(["faqs"]);
        setSelectedCategory(-1);
        addSuccess("Your items are successfully deleted");
      },
      onError: () => addError(),
    });

  const columns: ColumnsType<GetFaqResponseType> = [
    {
      title: "Question List",
      dataIndex: "question",
      key: "question",
      sorter: (a, b) => a.question.length - b.question.length,
      render: (text) => <div>{text.length > 40 ? text.slice(0, 40) + "..." : text}</div>,
    },

    {
      title: "Categories",
      dataIndex: "faq_category_id",
      key: "faq_category_id",
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
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Space>
          <Dropdown menu={{ items }} placement="bottom" arrow>
            <Button className="btn-action" type="primary">
              Action
            </Button>
          </Dropdown>
          <Button type="primary" className="btn-update">
            Edit
          </Button>
          <Button type="primary" danger onClick={() => onOpenModal(id)}>
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
          <Row justify="space-between" gutter={[0, 20]}>
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
          dataSource={data?.data}
          loading={isLoadingFaqs}
          columns={columns}
          scroll={{ x: 800 }}
          pagination={false}
          rowKey={(record) => record.id}
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

      <Modal
        width={400}
        title={
          <Space align="start">
            <CloseCircleFilled
              style={{
                color: "#DA4453",
                fontSize: 24,
              }}
            />
            <div>Do you want to delete these items?</div>
          </Space>
        }
        open={selectedCategory > 0}
        onOk={onDeleteFaq}
        onCancel={onCloseModal}
        okText="Delete"
        okButtonProps={{ loading: isLoadingDelete }}
      >
        <p
          style={{
            color: "#9C9C9C",
            marginLeft: 32,
          }}
        >
          Deleting this item will remove in the items list and cannot be undone, please be consider
          and check them again.
        </p>
      </Modal>
    </div>
  );
};

export default Faq;
