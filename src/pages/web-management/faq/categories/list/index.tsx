import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Modal, Space, Table, Tabs, TabsProps, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

import { useListFaqCategories } from "./list.action";
import {
  FaqCategoryResponseType,
  FaqCategoryStatusEnum,
} from "@/services/faq-category/faq-category.types";

const FaqCategories = () => {
  const {
    navigate,
    location,
    data,
    isLoading,
    selectedCategory,
    onDeleteFaqCategory,
    isLoadingDelete,
    onUpdateFaqCategory,
    onOpenModal,
    onCloseModal,
  } = useListFaqCategories();

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
      render: (id) => (
        <Space>
          <Dropdown
            menu={{
              items,
              onClick: ({ key }) =>
                onUpdateFaqCategory(
                  id,
                  {
                    status:
                      key === FaqCategoryStatusEnum.Active
                        ? FaqCategoryStatusEnum.Active
                        : FaqCategoryStatusEnum.Inactive,
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
            onClick={() => navigate(`/web-management/faq/categories/${id}`)}
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
        onOk={onDeleteFaqCategory}
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
          This category have 20 question, deleting category will remove the category in that
          question
        </p>
      </Modal>
    </div>
  );
};

export default FaqCategories;
