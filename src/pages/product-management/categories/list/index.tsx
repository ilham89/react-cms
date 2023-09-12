import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Modal, Space, Table, Tabs, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

import { useListProductCategories } from "./list.action";
import Pagination from "@/components/Pagination";
import { status } from "@/models/status";
import { productManagement } from "@/models/tabs";
import { GetProductCategoryResponseType } from "@/services/product-category/product-category.types";
import { StatusEnum } from "@/types/status";

const ProductCategories = () => {
  const {
    navigate,
    location,
    data,
    isLoading,
    isLoadingDelete,
    page,
    selectedItem,
    onChangePage,
    onSelectItem,
    onResetItem,
    onDeleteFaq,
    onUpdateProductCategory,
    onChangeTable,
  } = useListProductCategories();

  const columns: ColumnsType<GetProductCategoryResponseType> = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },

    {
      title: "Short Description",
      dataIndex: "short_description",
      key: "short_description",
      render: (text) => <>{text.length > 40 ? text.slice(0, 40) + "..." : text}</>,
    },
    {
      title: "Total Product Registered",
      dataIndex: "Products",
      key: "Products",
      align: "center",
      render: (value) => <>{value.length === 0 ? "-" : value.length}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
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
      align: "center",
      render: (id) => (
        <Space>
          <Dropdown
            menu={{
              items: status,
              onClick: ({ key }) =>
                onUpdateProductCategory(
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
            onClick={() => navigate(`/product-management/categories/${id}`)}
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
            Product
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => navigate("/product-management/categories/add")}
          >
            Add Categories
          </Button>
        </div>
        <Tabs
          tabBarStyle={{ margin: 0 }}
          defaultActiveKey={location.pathname}
          items={productManagement}
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
          onChange={onChangeTable}
          dataSource={data?.data}
          loading={isLoading}
          columns={columns}
          scroll={{ x: 800 }}
          pagination={false}
          rowKey={(record) => record.id}
          footer={() =>
            data && (
              <Pagination
                pageData={data?.data.length}
                limit={data.page_limit}
                page={page}
                totalData={data.total_data}
                totalPage={data.total_page}
                onChange={(page) => onChangePage(page)}
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
          This category have{" "}
          {data?.data[data.data.findIndex((item) => item.id === selectedItem)]?.Products?.length}{" "}
          product, deleting category will remove the category in that product
        </p>
      </Modal>
    </div>
  );
};

export default ProductCategories;
