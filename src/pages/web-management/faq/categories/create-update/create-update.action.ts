import { Form } from "antd";
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
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const params = useParams();
  const { addError, addSuccess } = useNotification();
  const { mutate, isLoading } = usePostFaqCategoryService();
  const { mutate: updateFaqCategory } = usePutFaqCategoryService();

  const { id } = params;

  useGetFaqCategoryService(id as string, {
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
      status: FaqCategoryStatusEnum.Active,
    };

    if (id) {
      updateFaqCategory(
        { id, data },
        {
          onSuccess: () => {
            addSuccess("Successfully updated faq category");
            navigate("/web-management/faq/categories");
          },
          onError: () => addError("Something went wrong"),
        },
      );
    } else {
      mutate(data, {
        onSuccess: () => {
          addSuccess("Successfully created faq category");
          navigate("/web-management/faq/categories");
        },
        onError: () => addError("Something went wrong"),
      });
    }
  };

  return {
    form,
    isLoading,
    onFinish,
  };
};
