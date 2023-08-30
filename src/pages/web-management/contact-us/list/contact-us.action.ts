import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useDebounce } from "@/hooks/useDebounce";
import { useSortTable } from "@/hooks/useSortTable";
import { contactUsServices } from "@/services/contact-us/contact-us.api";

export const useContactUs = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const debounceSearchValue = useDebounce(searchValue);

  const { orderBy, onChangeTable } = useSortTable();

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
