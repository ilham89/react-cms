import { useQuery } from "@tanstack/react-query";

import { useSearchPagination } from "@/hooks/useSearchPagination";
import { useSortTable } from "@/hooks/useSortTable";
import { contactUsServices } from "@/services/contact-us/contact-us.api";

export const useContactUs = () => {
  const { page, limit, debounceSearchValue, onChangeLimit, onChangePage, onChangeSearchValue } =
    useSearchPagination();
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
