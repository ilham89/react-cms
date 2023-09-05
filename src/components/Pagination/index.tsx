import { Row, Pagination as AntdPagination, PaginationProps as AntdPaginationProps } from "antd";

type PaginationProps = {
  page: number;
  paginationProps?: AntdPaginationProps;
  totalData: number;
  totalPage: number;
  limit: number;
  pageData: number;
  onChange: (page: number, pageSize: number) => void;
};

const Pagination = ({
  page,
  totalData,
  limit,
  totalPage,
  pageData,
  onChange,
  ...paginationProps
}: PaginationProps) => {
  return (
    <Row align="middle" justify="space-between">
      <div>
        {totalData === 0
          ? "No items found"
          : `Showing ${page == 1 ? 1 : (page - 1) * limit + 1} to ${
              page == totalPage ? (page - 1) * limit + pageData : page * limit
            } of ${totalData} entries`}
      </div>
      <AntdPagination
        pageSize={limit}
        total={totalData}
        current={page}
        showSizeChanger={false}
        onChange={onChange}
        {...paginationProps}
      />
    </Row>
  );
};

export default Pagination;
