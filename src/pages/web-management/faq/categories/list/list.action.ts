import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import useNotification from "@/hooks/useNotification";
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

  const [selectedCategory, setSelectedCategory] = useState<number>(-1);

  const onDeleteFaqCategory = () =>
    deleteFaqCategory(selectedCategory, {
      onSuccess: () => {
        queryClient.invalidateQueries(["faq-categories"]);
        setSelectedCategory(-1);
        addSuccess("Successfully deleted faq category");
      },
      onError: () => addError(),
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
        onError: () => addError(),
      },
    );

  const onOpenModal = (id: number) => setSelectedCategory(id);
  const onCloseModal = () => setSelectedCategory(-1);

  return {
    navigate,
    location,
    data,
    isLoading,
    selectedCategory,
    onDeleteFaqCategory,
    isLoadingDelete,
    onUpdateFaqCategory,
    onOpenModal,
    onCloseModal,
  };
};
