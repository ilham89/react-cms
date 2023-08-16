import { useState } from "react";

import { Form } from "antd";
import { RcFile } from "antd/es/upload";
import { useNavigate, useParams } from "react-router-dom";

import { File, FormValues } from "./create-update.types";
import useNotification from "@/hooks/useNotification";
import {
  useGetHeroPartnerService,
  usePostHeroPartnerService,
  usePutHeroPartnerService,
} from "@/services/hero-partner/hero-partner.hooks";
import { imageServices } from "@/services/image/image.api";

export const useCreateUpdateHeroSection = () => {
  const [form] = Form.useForm<FormValues>();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [file, setFile] = useState({} as File);
  const { addError, addSuccess } = useNotification();

  useGetHeroPartnerService(id as string, {
    enabled: !!id,
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
          onError: () => addError(),
        },
      );
    } else {
      create(payload, {
        onSuccess: () => {
          addSuccess("You`re changes are saved successfully");
          navigate("/web-management/homepage/hero-section");
        },
        onError: () => addError(),
      });
    }
  };

  const onCustomRequest = (file: string | Blob | RcFile) => {
    const preview = URL.createObjectURL(file as Blob);
    const formData = new FormData();
    formData.append("file", file);

    imageServices
      .postImage(formData)
      .then((res) =>
        setFile({
          file_name: res.data.file_name,
          preview,
        }),
      )
      .catch(() => addError());
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
