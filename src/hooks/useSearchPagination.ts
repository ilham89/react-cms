import * as React from "react";

import { useDebounce } from "./useDebounce";

export const useSearchPagination = () => {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(5);
  const [searchValue, setSearchValue] = React.useState<string>("");

  const debounceSearchValue = useDebounce(searchValue);

  const onChangePage = (value: number) => setPage(value);
  const onChangeLimit = (value: number) => setLimit(value);
  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearchValue(e.target.value);
  };

  return {
    page,
    limit,
    debounceSearchValue,
    onChangeLimit,
    onChangePage,
    onChangeSearchValue,
  };
};
