import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import useNotification from "@/hooks/useNotification";
import { useSearchPagination } from "@/hooks/useSearchPagination";
import { useSortTable } from "@/hooks/useSortTable";
import { productCategoryServices } from "@/services/product-category/product-category.api";
import {
  useDeleteProductCategoryService,
  usePutProductCategoryService,
} from "@/services/product-category/product-category.hooks";
import { ProductCategoryStatusEnum } from "@/services/product-category/product-category.types";
import { queryClient } from "@/utils/queryClient";

export const useListProductCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(-1);

  const { addError, addSuccess } = useNotification();
  const { orderBy, onChangeTable } = useSortTable();
  const { page, onChangePage } = useSearchPagination();

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

  const onOpenModal = (id: number) => setSelectedCategory(id);
  const onCloseModal = () => setSelectedCategory(-1);

  const onDeleteFaq = () =>
    deleteCategory(selectedCategory, {
      onSuccess: () => {
        queryClient.invalidateQueries(["product-categories"]);
        setSelectedCategory(-1);
        addSuccess("Your items are successfully deleted");
      },
      onError: (error) => {
        const newError = error as AxiosError<{ error: string }>;
        addError(newError.response?.data?.error);
      },
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
        onError: (error) => {
          const newError = error as AxiosError<{ error: string }>;
          addError(newError.response?.data?.error);
        },
      },
    );

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
