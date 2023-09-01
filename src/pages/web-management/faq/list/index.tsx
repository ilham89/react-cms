import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Modal, Row, Select, Space, Table, Tabs, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

import { useListFaq } from "./list.action";
import Pagination from "@/components/Pagination";
import { pageSize } from "@/models/page";
import { status } from "@/models/status";
import { faqManagement } from "@/models/tabs";
import { FaqStatusEnum, GetFaqResponseType } from "@/services/faq/faq.types";

const Faq = () => {
  const {
    location,
    data,
    isLoadingDelete,
    isLoadingFaqs,
    page,
    limit,
    selectedItem,
    navigate,
    onSelectItem,
    onResetItem,
    onChangeLimit,
    onChangePage,
    onChangeSearchValue,
    onChangeTable,
    onDeleteFaq,
    onUpdateFaq,
    setOpenStatus,
    openStatus,
    setFilter,
    filter,
  } = useListFaq();

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
              items: status,
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
          <Button type="primary" danger onClick={() => onSelectItem(id)}>
            Delete
          </Button>
        </Space>
      ),
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
        items={faqManagement}
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
                options={pageSize}
                onChange={onChangeLimit}
              />
              <Dropdown
                open={openStatus}
                onOpenChange={(open) => setOpenStatus(open)}
                trigger={["click"]}
                dropdownRender={() => (
                  <div
                    style={{
                      background: "white",
                      width: 300,
                      borderRadius: 8,
                      boxShadow:
                        "0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 16px",
                        borderBottom: "1px solid #E3EBF6",
                      }}
                    >
                      <div>Filter</div>
                      <div role="button" tabIndex={0} onClick={() => setFilter("")}>
                        Clear Filter
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 16px",
                        borderBottom: "1px solid #E3EBF6",
                      }}
                    >
                      <div>Status</div>
                      <Select
                        placeholder="Status"
                        options={[
                          { value: "", label: "All" },
                          { value: "Active", label: "Active" },
                          { value: "Inactive", label: "Inactive" },
                        ]}
                        onSelect={(value) => setFilter(value)}
                      />
                    </div>
                    <div
                      style={{
                        padding: "12px 16px",
                      }}
                    >
                      <Button type="primary" block onClick={() => setOpenStatus(false)}>
                        Apply Filter
                      </Button>
                    </div>
                  </div>
                )}
                arrow
                placement="bottomRight"
              >
                <Button>Filter | {filter ? 1 : 0}</Button>
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
        open={selectedItem > 0}
        onOk={onDeleteFaq}
        onCancel={onResetItem}
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
