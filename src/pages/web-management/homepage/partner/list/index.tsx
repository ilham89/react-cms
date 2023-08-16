import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, Tabs, TabsProps } from "antd";
import { ColumnsType } from "antd/es/table";

import { useListPartner } from "./list.action";
import DraggableIcon from "@/assets/icons/draggable.svg";
import { GetHeroPartnerResponseType } from "@/services/hero-partner/hero-partner.types";

const Partner = () => {
  const {
    navigate,
    location,
    onOpenModal,
    onCloseModal,
    data,
    isLoading,
    isLoadingDelete,
    onDeleteHeroPartner,
    selectedRow,
  } = useListPartner();

  const columns: ColumnsType<GetHeroPartnerResponseType> = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: () => (
        <img
          src={DraggableIcon}
          alt="draggable"
          width={24}
          height={24}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (value, record) => (
        <img
          src={value}
          width={80}
          height={40}
          alt={record.name}
          style={{
            objectFit: "contain",
          }}
        />
      ),
    },
    {
      title: "Banner Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Space>
          <Button
            type="primary"
            className="btn-update"
            onClick={() => navigate(`/web-management/homepage/partner/${id}`)}
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
      key: "/web-management/homepage/hero-section",
      label: "Hero Section",
    },
    {
      key: "/web-management/homepage/partner",
      label: "Partner",
    },
    {
      key: "/web-management/homepage/about",
      label: "About",
    },
    {
      key: "/web-management/homepage/cta",
      label: "CTA",
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
            Homepage
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => navigate("/web-management/homepage/partner/add")}
          >
            Add Partner
          </Button>
        </div>
        <Tabs
          tabBarStyle={{ margin: 0 }}
          defaultActiveKey={location.pathname}
          items={tabs}
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
          Partner List
        </div>
        <Table
          dataSource={data?.data}
          columns={columns}
          pagination={false}
          loading={isLoading}
          rowKey={(record) => record.id}
          scroll={{ x: 800 }}
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
        open={selectedRow > 0}
        onOk={onDeleteHeroPartner}
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

export default Partner;
