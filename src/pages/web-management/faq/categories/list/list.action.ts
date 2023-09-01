import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import useNotification from "@/hooks/useNotification";
import { useSelectItem } from "@/hooks/useSelectItem";
import {
  useDeleteFaqCategoryService,
  useGetFaqCategoriesService,
  usePutFaqCategoryService,
} from "@/services/faq-category/faq-category.hooks";
import { FaqCategoryStatusEnum } from "@/services/faq-category/faq-category.types";
import { queryClient } from "@/utils/queryClient";

export const useListFaqCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading } = useGetFaqCategoriesService();
  const { mutate: deleteFaqCategory, isLoading: isLoadingDelete } = useDeleteFaqCategoryService();
  const { mutate: updateFaqCategory } = usePutFaqCategoryService();
  const { addError, addSuccess } = useNotification();
  const { selectedItem, onSelectItem, onResetItem } = useSelectItem();

  const onDeleteFaqCategory = () =>
    deleteFaqCategory(selectedItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(["faq-categories"]);
        onResetItem();
        addSuccess("Successfully deleted faq category");
      },
      onError: (error) => {
        const newError = error as AxiosError<{ error: string }>;
        addError(newError.response?.data?.error);
      },
    });

  const onUpdateFaqCategory = (id: string, data: { status: FaqCategoryStatusEnum }, key: string) =>
    updateFaqCategory(
      {
        id,
        data,
      },
      {
        onSuccess: () => {
          addSuccess(`Successfully changed status to ${key}`);
          queryClient.invalidateQueries(["faq-categories"]);
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
    selectedItem,
    onDeleteFaqCategory,
    isLoadingDelete,
    onUpdateFaqCategory,
    onSelectItem,
    onResetItem,
  };
};
