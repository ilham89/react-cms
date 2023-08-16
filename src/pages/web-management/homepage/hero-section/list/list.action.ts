import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import useNotification from "@/hooks/useNotification";
import {
  useDeleteHeroPartnerService,
  useGetHeroPartnersService,
} from "@/services/hero-partner/hero-partner.hooks";
import { queryClient } from "@/utils/queryClient";

export const useListHeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState(-1);

  const onOpenModal = (id: number) => setSelectedRow(id);
  const onCloseModal = () => setSelectedRow(-1);

  const { addError, addSuccess } = useNotification();
  const { data, isLoading } = useGetHeroPartnersService();

  const { mutate, isLoading: isLoadingDelete } = useDeleteHeroPartnerService();

  const onDeleteHeroPartner = () =>
    mutate(selectedRow, {
      onSuccess: () => {
        queryClient.invalidateQueries(["hero-sections"]);
        setSelectedRow(-1);
        addSuccess("Your items are successfully deleted");
      },
      onError: () => addError(),
    });

  return {
    navigate,
    location,
    onOpenModal,
    onCloseModal,
    data,
    isLoading,
    isLoadingDelete,
    onDeleteHeroPartner,
    selectedRow,
  };
};
