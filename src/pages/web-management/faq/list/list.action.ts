import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { useDebounce } from "@/hooks/useDebounce";
import useNotification from "@/hooks/useNotification";
import { useSortTable } from "@/hooks/useSortTable";
import { faqServices } from "@/services/faq/faq.api";
import { useDeleteFaqService, usePutFaqService } from "@/services/faq/faq.hooks";
import { FaqStatusEnum } from "@/services/faq/faq.types";
import { queryClient } from "@/utils/queryClient";

export const useListFaq = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const debounceSearchValue = useDebounce(searchValue);

  const { orderBy, onChangeTable } = useSortTable();

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

  const onOpenModal = (id: number) => setSelectedCategory(id);
  const onCloseModal = () => setSelectedCategory(-1);

  const onChangeLimit = (value: number) => setLimit(value);
  const onChangePage = (value: number) => setPage(value);

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setPage(1);
  };

  const onDeleteFaq = () =>
    deleteFaq(selectedCategory, {
      onSuccess: () => {
        queryClient.invalidateQueries(["faqs"]);
        setSelectedCategory(-1);
        addSuccess("Your items are successfully deleted");
      },
      onError: () => addError(),
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
        onError: () => addError(),
      },
    );

  return {
    location,
    data,
    isLoadingDelete,
    isLoadingFaqs,
    page,
    limit,
    selectedCategory,
    navigate,
    onOpenModal,
    onCloseModal,
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
