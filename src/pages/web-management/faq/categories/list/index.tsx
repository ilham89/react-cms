import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Modal, Space, Table, Tabs, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

import { useListFaqCategories } from "./list.action";
import { status } from "@/models/status";
import { faqManagement } from "@/models/tabs";
import { GetFaqCategoryResponseType } from "@/services/faq-category/faq-category.types";
import { StatusEnum } from "@/types/status";

const FaqCategories = () => {
  const {
    navigate,
    location,
    data,
    isLoading,
    selectedItem,
    onDeleteFaqCategory,
    isLoadingDelete,
    onUpdateFaqCategory,
    onSelectItem,
    onResetItem,
  } = useListFaqCategories();

  const columns: ColumnsType<GetFaqCategoryResponseType> = [
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
      dataIndex: "FAQs",
      key: "FAQs",
      render: (value) => (
        <div
          style={{
            color: "#52B2BF",
            textDecoration: "underline",
          }}
        >
          {value.length}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <Tag bordered={false} color={value === StatusEnum.Active ? "success" : "error"}>
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
                onUpdateFaqCategory(
                  id,
                  {
                    status: key === StatusEnum.Active ? StatusEnum.Active : StatusEnum.Inactive,
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
          <Button type="primary" danger onClick={() => onSelectItem(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space size="middle" direction="vertical" style={{ width: "100%" }}>
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
          items={faqManagement}
          onChange={(active) => navigate(active)}
        />
      </Space>

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
        open={selectedItem > 0}
        onOk={onDeleteFaqCategory}
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
          This category have{" "}
          {data?.data[data.data.findIndex((item) => item.id === selectedItem)]?.FAQs.length}{" "}
          question, deleting category will remove the category in that question
        </p>
      </Modal>
    </div>
  );
};

export default FaqCategories;
