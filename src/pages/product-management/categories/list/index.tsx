import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Pagination,
  Row,
  Space,
  Table,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";

import { useListProductCategories } from "./list.action";
import {
  GetProductCategoryResponseType,
  ProductCategoryStatusEnum,
} from "@/services/product-category/product-category.types";

const ProductCategories = () => {
  const {
    navigate,
    location,
    data,
    isLoading,
    isLoadingDelete,
    page,
    selectedCategory,
    onChangePage,
    onOpenModal,
    onCloseModal,
    onDeleteFaq,
    onUpdateProductCategory,
    onChangeTable,
  } = useListProductCategories();

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
        <Tag
          bordered={false}
          color={value === ProductCategoryStatusEnum.Active ? "success" : "error"}
        >
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
              items,
              onClick: ({ key }) =>
                onUpdateProductCategory(
                  id,
                  {
                    status:
                      key === ProductCategoryStatusEnum.Active
                        ? ProductCategoryStatusEnum.Active
                        : ProductCategoryStatusEnum.Inactive,
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
          <Button type="primary" danger onClick={() => onOpenModal(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const tabs: TabsProps["items"] = [
    {
      key: "/product-management/categories",
      label: "Category List",
    },
    {
      key: "/product-management/products",
      label: "Product List",
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
          onChange={onChangeTable}
          dataSource={data?.data}
          loading={isLoading}
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
                pageSize={10}
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
          This category have{" "}
          {
            data?.data[data.data.findIndex((item) => item.id === selectedCategory)]?.Products
              ?.length
          }{" "}
          product, deleting category will remove the category in that product
        </p>
      </Modal>
    </div>
  );
};

export default ProductCategories;
