import { useState } from "react";

import { Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { FormValues } from "./create-update.types";
import useNotification from "@/hooks/useNotification";
import { useGetFaqService, usePostFaqService, usePutFaqService } from "@/services/faq/faq.hooks";
import { FaqStatusEnum, FeaturedFaqEnum } from "@/services/faq/faq.types";
import { useGetFaqCategoriesService } from "@/services/faq-category/faq-category.hooks";

export const useCreateUpdateFaq = () => {
  const [form] = Form.useForm<FormValues>();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const { data: faqCategories, isLoading: isLoadingCategories } = useGetFaqCategoriesService();
  const { mutate: createFaq, isLoading: isLoadingCreate } = usePostFaqService();
  const { mutate: updateFaq, isLoading: isLoadingUpdate } = usePutFaqService();
  const { addSuccess, addError } = useNotification();

  const [featured, setFeatured] = useState<boolean>(false);

  const isLoadingSubmit = isLoadingCreate || isLoadingUpdate;

  const { data: detail } = useGetFaqService(id as string, {
    enabled: !!id,
    onSuccess: ({ data }) => {
      form.setFieldsValue({
        question: data.question,
        faq_category_id: data.faq_category_id,
        answer: data.answer,
      });
      setFeatured(data.featured === FeaturedFaqEnum.Yes);
    },
  });

  const onChangeFeatured = (checked: boolean) => setFeatured(checked);

  const onFinish = (values: FormValues) => {
    const data = {
      ...values,
      featured: featured ? FeaturedFaqEnum.Yes : FeaturedFaqEnum.No,
      status:
        id && detail?.data.status === FaqStatusEnum.Inactive
          ? FaqStatusEnum.Inactive
          : FaqStatusEnum.Active,
    };
    if (id) {
      updateFaq(
        { id, data },
        {
          onSuccess: () => {
            addSuccess("You`re changes are saved successfully");
            navigate("/web-management/faq");
          },
          onError: () => addError(),
        },
      );
    } else {
      createFaq(data, {
        onSuccess: () => {
          addSuccess("You`re changes are saved successfully");
          navigate("/web-management/faq");
        },
        onError: () => addError(),
      });
    }
  };
  return {
    form,
    id,
    navigate,
    faqCategories,
    isLoadingCategories,
    isLoadingSubmit,
    featured,
    onChangeFeatured,
    onFinish,
  };
};
