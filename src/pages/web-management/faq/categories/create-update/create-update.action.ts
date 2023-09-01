import { Form } from "antd";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { FormValues } from "./create-update.types";
import useNotification from "@/hooks/useNotification";
import {
  useGetFaqCategoryService,
  usePostFaqCategoryService,
  usePutFaqCategoryService,
} from "@/services/faq-category/faq-category.hooks";
import { FaqCategoryStatusEnum } from "@/services/faq-category/faq-category.types";

export const useCreateUpdateFaqCategory = () => {
  const [form] = Form.useForm<FormValues>();

  const navigate = useNavigate();
  const params = useParams();
  const { addError, addSuccess } = useNotification();
  const { mutate: createFaqCategory, isLoading: isLoadingCreate } = usePostFaqCategoryService();
  const { mutate: updateFaqCategory, isLoading: isLoadingUpdate } = usePutFaqCategoryService();

  const { id } = params;

  const onBack = () => navigate("/web-management/faq/categories");
  const isLoadingSubmit = isLoadingCreate || isLoadingUpdate;

  const { data: detail } = useGetFaqCategoryService(id as string, {
    enabled: !!id,
    onSuccess: ({ data }) => {
      form.setFieldsValue({
        name: data.name,
        short_description: data.short_description,
      });
    },
  });

  const onFinish = (values: FormValues) => {
    const data = {
      ...values,
      status:
        id && detail?.data.status === FaqCategoryStatusEnum.Inactive
          ? FaqCategoryStatusEnum.Inactive
          : FaqCategoryStatusEnum.Active,
    };

    if (id) {
      updateFaqCategory(
        { id, data },
        {
          onSuccess: () => {
            addSuccess("Successfully updated faq category");
            navigate("/web-management/faq/categories");
          },
          onError: (error) => {
            const newError = error as AxiosError<{ error: string }>;
            addError(newError.response?.data?.error);
          },
        },
      );
    } else {
      createFaqCategory(data, {
        onSuccess: () => {
          addSuccess("Successfully created faq category");
          navigate("/web-management/faq/categories");
        },
        onError: (error) => {
          const newError = error as AxiosError<{ error: string }>;
          addError(newError.response?.data?.error);
        },
      });
    }
  };

  return {
    form,
    id,
    isLoadingSubmit,
    onFinish,
    onBack,
  };
};
