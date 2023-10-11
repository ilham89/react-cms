import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, Tabs } from "antd";
import { ColumnsType } from "antd/es/table";

import { useListProductCategories } from "./list.action";
import Pagination from "@/components/Pagination";
import { productManagement } from "@/models/tabs";
import { GetUserResponseType } from "@/services/user/user.types";

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
  } = useListProductCategories();

  const columns: ColumnsType<GetUserResponseType> = [
    {
      title: "Name",
      dataIndex: "avatar",
      key: "avatar",
      render: (_value, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id) => (
        <Space>
          <Button
            type="primary"
            className="btn-update"
            onClick={() => navigate(`/web-management/users/${id}`)}
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
            User
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => navigate("/web-management/users/add")}
          >
            Add User
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
          User List
        </div>
        <Table
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
                limit={data.per_page}
                page={page}
                totalData={data.total}
                totalPage={data.total_pages}
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
          Are you sure delete this users?
        </p>
      </Modal>
    </div>
  );
};

export default ProductCategories;
