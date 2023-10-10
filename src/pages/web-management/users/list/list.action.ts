import { useQuery } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { useSearchPagination } from "@/hooks/useSearchPagination";
import { useSelectItem } from "@/hooks/useSelectItem";
import { userService } from "@/services/user/user.api";
import { useDeleteUserService } from "@/services/user/user.hooks";
import { queryClient } from "@/utils/queryClient";

export const useListProductCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notification } = App.useApp();

  const { selectedItem, onSelectItem, onResetItem } = useSelectItem();

  const { page, onChangePage } = useSearchPagination();

  const { data, isLoading } = useQuery(["users", page], () =>
    userService.getUsers({
      per_page: 10,
      page,
    }),
  );

  const { mutate: deleteUser, isLoading: isLoadingDelete } = useDeleteUserService();

  const onDeleteFaq = () =>
    deleteUser(selectedItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        notification.success({ message: "Your items are successfully deleted" });
        onResetItem();
      },
      onError: (error) => {
        const newError = error as AxiosError<{ error: string }>;
        notification.error({ message: newError.response?.data?.error });
      },
    });

  return {
    navigate,
    location,
    data,
    isLoading,
    isLoadingDelete,
    page,
    selectedItem,
    onChangePage,
    onSelectItem,
    onResetItem,
    onDeleteFaq,
  };
};
