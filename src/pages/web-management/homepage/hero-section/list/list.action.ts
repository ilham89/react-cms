import { useState } from "react";

import { DragEndEvent } from "@dnd-kit/core";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import useNotification from "@/hooks/useNotification";
import {
  useDeleteHeroPartnerService,
  useGetHeroPartnersService,
  usePutHeroPartnerOrderService,
} from "@/services/hero-partner/hero-partner.hooks";
import { GetHeroPartnerResponseType } from "@/services/hero-partner/hero-partner.types";
import { updateOrder } from "@/utils/array";
import { queryClient } from "@/utils/queryClient";

export const useListHeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState<number>(-1);
  const [dataSource, setDataSource] = useState<GetHeroPartnerResponseType[]>([]);

  const onOpenModal = (id: number) => setSelectedRow(id);
  const onCloseModal = () => setSelectedRow(-1);

  const { addError, addSuccess } = useNotification();
  const { isLoading } = useGetHeroPartnersService(
    { type: "Hero Sections" },
    {
      onSuccess: ({ data }) => setDataSource(data),
    },
  );

  const { mutate, isLoading: isLoadingDelete } = useDeleteHeroPartnerService();
  const { mutate: order } = usePutHeroPartnerOrderService();

  const onDeleteHeroPartner = () =>
    mutate(selectedRow, {
      onSuccess: () => {
        queryClient.invalidateQueries(["hero-sections"]);
        setSelectedRow(-1);
        addSuccess("Your items are successfully deleted");
      },
      onError: (error) => {
        const newError = error as AxiosError<{ error: string }>;
        addError(newError.response?.data?.error);
      },
    });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const newDataSource = [...dataSource];
      const activeIndex = newDataSource.findIndex((i) => i.id === active.id);
      const overIndex = newDataSource.findIndex((i) => i.id === over?.id);

      const updateDataSource = updateOrder(newDataSource, activeIndex, overIndex);

      setDataSource(updateDataSource);
      order(
        {
          data: updateDataSource,
        },
        {
          onSuccess: () => addSuccess("Your items are successfully updated"),
          onError: (error) => {
            const newError = error as AxiosError<{ error: string }>;
            addError(newError.response?.data?.error);
          },
        },
      );
    }
  };

  return {
    navigate,
    location,
    onOpenModal,
    onCloseModal,
    dataSource,
    isLoading,
    isLoadingDelete,
    onDeleteHeroPartner,
    selectedRow,
    onDragEnd,
  };
};
