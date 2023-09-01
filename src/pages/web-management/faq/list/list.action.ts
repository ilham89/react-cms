import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import useNotification from "@/hooks/useNotification";
import { useSearchPagination } from "@/hooks/useSearchPagination";
import { useSelectItem } from "@/hooks/useSelectItem";
import { useSortTable } from "@/hooks/useSortTable";
import { faqServices } from "@/services/faq/faq.api";
import { useDeleteFaqService, usePutFaqService } from "@/services/faq/faq.hooks";
import { FaqStatusEnum } from "@/services/faq/faq.types";
import { queryClient } from "@/utils/queryClient";

export const useListFaq = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState<string>("");
  const [openStatus, setOpenStatus] = useState<boolean>(false);

  const { page, limit, debounceSearchValue, onChangeLimit, onChangePage, onChangeSearchValue } =
    useSearchPagination();
  const { orderBy, onChangeTable } = useSortTable();
  const { selectedItem, onSelectItem, onResetItem } = useSelectItem();

  const { data, isLoading: isLoadingFaqs } = useQuery(
    ["faqs", limit, page, debounceSearchValue, orderBy, openStatus],
    () =>
      faqServices.getFaqs({
        limit,
        page,
        q: debounceSearchValue,
        order_field: "question",
        order_by: orderBy,
        status: filter,
      }),
  );
  const { mutate: deleteFaq, isLoading: isLoadingDelete } = useDeleteFaqService();
  const { mutate: updateFaq } = usePutFaqService();
  const { addError, addSuccess } = useNotification();

  const onDeleteFaq = () =>
    deleteFaq(selectedItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(["faqs"]);
        onResetItem();
        addSuccess("Your items are successfully deleted");
      },
      onError: (error) => {
        const newError = error as AxiosError<{ error: string }>;
        addError(newError.response?.data?.error);
      },
    });

  const onUpdateFaq = (id: string, data: { status: FaqStatusEnum }, key: string) =>
    updateFaq(
      {
        id,
        data,
      },
      {
        onSuccess: () => {
          addSuccess(`Successfully changed status to ${key}`);
          queryClient.invalidateQueries(["faqs"]);
        },
        onError: (error) => {
          const newError = error as AxiosError<{ error: string }>;
          addError(newError.response?.data?.error);
        },
      },
    );

  return {
    location,
    data,
    isLoadingDelete,
    isLoadingFaqs,
    page,
    limit,
    selectedItem,
    navigate,
    onSelectItem,
    onResetItem,
    onChangeLimit,
    onChangePage,
    onChangeSearchValue,
    onChangeTable,
    onDeleteFaq,
    onUpdateFaq,
    setOpenStatus,
    openStatus,
    setFilter,
    filter,
  };
};
