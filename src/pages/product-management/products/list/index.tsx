import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import Pagination from "@/components/Pagination";
import useNotification from "@/hooks/useNotification";
import { useSearchPagination } from "@/hooks/useSearchPagination";
import { useSelectItem } from "@/hooks/useSelectItem";
import { useSortTable } from "@/hooks/useSortTable";
import { pageSize } from "@/models/page";
import { productManagement } from "@/models/tabs";
import { productServices } from "@/services/product/product.api";
import { useDeleteProductService } from "@/services/product/product.hooks";
import { GetProductResponseType } from "@/services/product/product.types";
import { queryClient } from "@/utils/queryClient";
import { thousandFormat } from "@/utils/string";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Active
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Inactive
      </a>
    ),
  },
];

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { page, limit, debounceSearchValue, onChangeLimit, onChangePage, onChangeSearchValue } =
    useSearchPagination();
  const { addError, addSuccess } = useNotification();
  const { orderBy, onChangeTable } = useSortTable();
  const { selectedItem, onSelectItem, onResetItem } = useSelectItem();

  const { data, isLoading } = useQuery(
    ["products", page, limit, debounceSearchValue, orderBy],
    () =>
      productServices.getProducts({
        limit,
        page,
        q: debounceSearchValue,
        order_by: orderBy,
        order_field: "name",
      }),
  );

  const { mutate: deleteProduct, isLoading: isLoadingDelete } = useDeleteProductService();

  const onDeleteFaq = () =>
    deleteProduct(selectedItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
        addSuccess("Your items are successfully deleted");
      },
      onError: (error) => {
        const newError = error as AxiosError<{ error: string }>;
        addError(newError.response?.data?.error);
      },
    });

  const columns: ColumnsType<GetProductResponseType> = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Categories",
      dataIndex: "ProductCategory",
      key: "ProductCategory",
      render: (value) => <>{value.name}</>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => <>{thousandFormat(value)}</>,
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (value) => (
        <Space>
          {value.map((v: string) => (
            <Tag
              key={v}
              bordered={false}
              style={{
                backgroundColor: "#1a252d",
                color: "white",
              }}
            >
              {v}
            </Tag>
          ))}
        </Space>
      ),
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
            onClick={() => navigate(`/product-management/products/${id}`)}
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
          Product
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => navigate("/product-management/products/add")}
        >
          Add Product
        </Button>
      </div>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        defaultActiveKey={location.pathname}
        items={productManagement}
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
          <Row justify="space-between">
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
              <Dropdown menu={{ items }} arrow placement="bottomRight">
                <Button>Filter | 0</Button>
              </Dropdown>
            </Space>
          </Row>
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
                limit={limit}
                page={page}
                pageData={data.data.length}
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
          Deleting this item will remove in the items list and cannot be undone, please be consider
          and check them again.
        </p>
      </Modal>
    </div>
  );
};

export default Products;
