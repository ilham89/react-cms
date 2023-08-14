import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import type { TablePaginationConfig } from "antd";
import type { FilterValue, SorterResult } from "antd/es/table/interface";

import { useDebounce } from "@/hooks/useDebounce";
import { contactUsServices } from "@/services/contact-us/contact-us.api";
import type { GetContactUsResponseType } from "@/services/contact-us/contact-us.types";

export const useContactUs = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [orderBy, setOrderBy] = useState<string>("");
  const debounceSearchValue = useDebounce(searchValue);

  const { data, isLoading } = useQuery(
    ["contact-us", debounceSearchValue, page, limit, orderBy],
    () =>
      contactUsServices.getContactUs({
        limit,
        page,
        q: debounceSearchValue,
        order_field: "createdAt",
        order_by: orderBy,
      }),
  );

  const onChangeLimit = (value: number) => setLimit(value);
  const onChangePage = (page: number) => setPage(page);

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setPage(1);
  };

  const onChangeTable = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<GetContactUsResponseType> | SorterResult<GetContactUsResponseType>[],
  ) => {
    if (!Array.isArray(sorter)) {
      if (!sorter.order) return setOrderBy("");
      if (sorter.order === "ascend") return setOrderBy("ASC");
      return setOrderBy("DESC");
    }
  };

  return {
    data,
    page,
    limit,
    isLoading,
    onChangeLimit,
    onChangePage,
    onChangeSearchValue,
    onChangeTable,
  };
};
