import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button, Modal, Space, Table, Tabs } from "antd";
import { ColumnsType } from "antd/es/table";

import { useListHeroSection } from "./list.action";
import RowDraggable from "@/components/RowDraggable";
import { homeManagement } from "@/models/tabs";
import { GetHeroPartnerResponseType } from "@/services/hero-partner/hero-partner.types";

const HeroSection = () => {
  const {
    navigate,
    location,
    onSelectItem,
    onResetItem,
    dataSource,
    isLoading,
    isLoadingDelete,
    onDeleteHeroPartner,
    selectedItem,
    onDragEnd,
  } = useListHeroSection();

  const columns: ColumnsType<GetHeroPartnerResponseType> = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
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
            onClick={() => navigate(`/web-management/homepage/hero-section/${id}`)}
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
            Homepage
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => navigate("/web-management/homepage/hero-section/add")}
          >
            Add Banner
          </Button>
        </div>
        <Tabs
          tabBarStyle={{ margin: 0 }}
          defaultActiveKey={location.pathname}
          items={homeManagement}
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
          Banner List
        </div>

        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={dataSource.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{
                body: {
                  row: RowDraggable,
                },
              }}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              loading={isLoading}
              rowKey={(record) => record.id}
              scroll={{ x: 800 }}
            />
          </SortableContext>
        </DndContext>
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
        onOk={onDeleteHeroPartner}
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

export default HeroSection;
