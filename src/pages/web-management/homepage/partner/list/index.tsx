import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tabs, TabsProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { useLocation, useNavigate } from "react-router-dom";

import DraggableIcon from "@/assets/icons/draggable.svg";

interface DataType {
  key: string;
  name: string;
  description: string;
  image: string;
}

const Partner = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dataSource: DataType[] = [
    {
      key: "1",
      name: "Mikeeeee",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, tenetur ab laboriosam eveniet veniam voluptatum sed dicta atque cupiditate doloremque blanditiis natus neque, ad inventore placeat officiis! Ad, ipsam doloremque!",
      image:
        "https://res.cloudinary.com/ds73yosji/image/upload/v1678074667/gemilang/354072278ea3016361f1453d9659c212_bei0uy.jpg",
    },
    {
      key: "2",
      name: "John",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, tenetur ab laboriosam eveniet veniam voluptatum sed dicta atque cupiditate doloremque blanditiis natus neque, ad inventore placeat officiis! Ad, ipsam doloremque!",
      image:
        "https://res.cloudinary.com/ds73yosji/image/upload/v1678074667/gemilang/354072278ea3016361f1453d9659c212_bei0uy.jpg",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
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
      dataIndex: "image",
      key: "image",
      render: (value) => <img src={value} width={80} height={40} alt={value} />,
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
      dataIndex: "key",
      key: "key",
      render: () => (
        <Space>
          <Button type="primary" className="btn-update">
            Edit
          </Button>
          <Button type="primary" danger>
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
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default Partner;
