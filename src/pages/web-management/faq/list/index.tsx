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

import { useListFaq } from "./list.action";
import { FaqStatusEnum, GetFaqResponseType } from "@/services/faq/faq.types";

const Faq = () => {
  const {
    location,
    data,
    isLoadingDelete,
    isLoadingFaqs,
    page,
    limit,
    selectedCategory,
    navigate,
    onOpenModal,
    onCloseModal,
    onChangeLimit,
    onChangePage,
    onChangeSearchValue,
    onChangeTable,
    onDeleteFaq,
    onUpdateFaq,
  } = useListFaq();

  const items: MenuProps["items"] = [
    {
      key: "Active",
      label: <div>Active</div>,
    },
    {
      key: "Inactive",
      label: <div>Inactive</div>,
    },
  ];

  const columns: ColumnsType<GetFaqResponseType> = [
    {
      title: "Question List",
      dataIndex: "question",
      key: "question",
      sorter: true,
      render: (text) => <div>{text.length > 40 ? text.slice(0, 40) + "..." : text}</div>,
    },
    {
      title: "Categories",
      dataIndex: "FAQCategory",
      key: "FAQCategory.id",
      render: (value) => <>{value.name}</>,
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
        <Tag bordered={false} color={value === FaqStatusEnum.Active ? "success" : "error"}>
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
          <Dropdown
            menu={{
              items,
              onClick: ({ key }) =>
                onUpdateFaq(
                  id,
                  {
                    status:
                      key === FaqStatusEnum.Active ? FaqStatusEnum.Active : FaqStatusEnum.Inactive,
                  },
                  key,
                ),
            }}
            placement="bottom"
            arrow
          >
            <Button className="btn-action" type="primary">
              Action
            </Button>
          </Dropdown>
          <Button
            type="primary"
            className="btn-update"
            onClick={() => navigate(`/web-management/faq/${id}`)}
          >
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
          onChange={onChangeTable}
          dataSource={data?.data}
          loading={isLoadingFaqs}
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
