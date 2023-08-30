import { useState } from "react";

import { Form } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { IFormValues } from "./return-policy.types";
import useNotification from "@/hooks/useNotification";
import {
  useGetWebManagementsService,
  usePostWebManagementService,
  usePutWebManagementService,
} from "@/services/web-management/web-management.hooks";

export const useReturnPolicy = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { addError, addSuccess } = useNotification();

  const [indexPage, setIndexPage] = useState<number>(-1);

  const { data } = useGetWebManagementsService({
    onSuccess: ({ data }) => {
      const indexPage = data.findIndex((datum) => datum.name === "Return Policy");
      setIndexPage(indexPage);

      if (indexPage === -1) return;
      form.setFieldValue("return_policy", data[indexPage].description);
    },
  });

  const { mutate: create, isLoading: isLoadingCreate } = usePostWebManagementService();
  const { mutate: update, isLoading: isLoadingUpdate } = usePutWebManagementService();

  const isLoading = isLoadingCreate || isLoadingUpdate;

  const onSubmit = (values: IFormValues) => {
    if (indexPage === -1) {
      const createPayload = {
        name: "Return Policy",
        description: values.return_policy,
      };
      create(createPayload, {
        onSuccess: () => addSuccess("You`re changes are saved successfully"),
        onError: () => addError(),
      });
    } else {
      const updatePayload = {
        id: data?.data[indexPage].id as number,
        data: {
          description: values.return_policy,
        },
      };
      update(updatePayload, {
        onSuccess: () => addSuccess("You`re changes are saved successfully"),
        onError: () => addError(),
      });
    }
  };

  return {
    form,
    location,
    navigate,
    isLoading,
    onSubmit,
  };
};
