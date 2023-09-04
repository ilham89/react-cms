import { Form } from "antd";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { FormValues } from "./create-update.types";
import useNotification from "@/hooks/useNotification";
import { useUploadRequest } from "@/hooks/useUploadRequest";
import {
  useGetHeroPartnerService,
  usePostHeroPartnerService,
  usePutHeroPartnerService,
} from "@/services/hero-partner/hero-partner.hooks";

export const useCreateUpdateHeroSection = () => {
  const [form] = Form.useForm<FormValues>();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { addError, addSuccess } = useNotification();
  const { file, setFile, onCustomRequest } = useUploadRequest();

  useGetHeroPartnerService(id as string, {
    enabled: !!id,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      form.setFieldsValue({
        name: data.name,
        description: data.description,
        image: data.image,
      });
      setFile({
        file_name: data.image,
        preview: data.image_url,
      });
    },
  });

  const { mutate: create, isLoading: isLoadingCreate } = usePostHeroPartnerService();
  const { mutate: update, isLoading: isLoadingUpdate } = usePutHeroPartnerService();

  const onSubmit = (values: FormValues) => {
    delete values.image;

    const payload = {
      ...values,
      image: file.file_name,
      ...(!id && {
        type: "Hero Sections",
      }),
    };

    if (id) {
      update(
        { id, data: payload },
        {
          onSuccess: () => {
            addSuccess("You`re changes are saved successfully");
            navigate("/web-management/homepage/hero-section");
          },
          onError: (error) => {
            const newError = error as AxiosError<{ error: string }>;
            addError(newError.response?.data?.error);
          },
        },
      );
    } else {
      create(payload, {
        onSuccess: () => {
          addSuccess("You`re changes are saved successfully");
          navigate("/web-management/homepage/hero-section");
        },
        onError: (error) => {
          const newError = error as AxiosError<{ error: string }>;
          addError(newError.response?.data?.error);
        },
      });
    }
  };

  const isLoading = isLoadingCreate || isLoadingUpdate;
  return {
    form,
    navigate,
    id,
    file,
    onSubmit,
    isLoading,
    onCustomRequest,
  };
};
