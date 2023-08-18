import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useLocation, useNavigate } from "react-router-dom";

import useNotification from "@/hooks/useNotification";
import { productCategoryServices } from "@/services/product-category/product-category.api";
import {
  useDeleteProductCategoryService,
  usePutProductCategoryService,
} from "@/services/product-category/product-category.hooks";
import {
  GetProductCategoryResponseType,
  ProductCategoryStatusEnum,
} from "@/services/product-category/product-category.types";
import { queryClient } from "@/utils/queryClient";

export const useListProductCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [orderBy, setOrderBy] = useState("");

  const { addError, addSuccess } = useNotification();
  const { data, isLoading } = useQuery(["product-categories", page, orderBy], () =>
    productCategoryServices.getProductCategories({
      limit: 10,
      page,
      order_by: orderBy,
      order_field: "name",
    }),
  );

  const { mutate: deleteCategory, isLoading: isLoadingDelete } = useDeleteProductCategoryService();
  const { mutate: updateCategory } = usePutProductCategoryService();

  const onChangePage = (value: number) => setPage(value);
  const onOpenModal = (id: number) => setSelectedCategory(id);
  const onCloseModal = () => setSelectedCategory(-1);

  const onDeleteFaq = () =>
    deleteCategory(selectedCategory, {
      onSuccess: () => {
        queryClient.invalidateQueries(["product-categories"]);
        setSelectedCategory(-1);
        addSuccess("Your items are successfully deleted");
      },
      onError: () => addError(),
    });

  const onUpdateProductCategory = (
    id: number,
    data: { status: ProductCategoryStatusEnum },
    key: string,
  ) =>
    updateCategory(
      {
        id,
        data,
      },
      {
        onSuccess: () => {
          addSuccess(`Successfully changed status to ${key}`);
          queryClient.invalidateQueries(["product-categories"]);
        },
        onError: () => addError(),
      },
    );

  const onChangeTable = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<GetProductCategoryResponseType>
      | SorterResult<GetProductCategoryResponseType>[],
  ) => {
    if (!Array.isArray(sorter)) {
      if (!sorter.order) return setOrderBy("");
      if (sorter.order === "ascend") return setOrderBy("ASC");
      return setOrderBy("DESC");
    }
  };
  return {
    navigate,
    location,
    data,
    isLoading,
    isLoadingDelete,
    page,
    selectedCategory,
    onChangePage,
    onOpenModal,
    onCloseModal,
    onDeleteFaq,
    onUpdateProductCategory,
    onChangeTable,
  };
};
