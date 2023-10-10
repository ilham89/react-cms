import { App, Form } from "antd";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { FormValues } from "./create-update.types";
import {
  useGetUserService,
  usePostUserService,
  usePutUserService,
} from "@/services/user/user.hooks";
import { errorMessage } from "@/utils/message";

export const useCreateUpdateUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const { notification } = App.useApp();

  const { id } = params;

  const { mutate: create, isLoading: isLoadingCreate } = usePostUserService();
  const { mutate: update, isLoading: isLoadingUpdate } = usePutUserService();

  useGetUserService(id as string, {
    enabled: !!id,
    onSuccess: ({ data }) => {
      form.setFieldsValue({
        name: data.first_name,
        job: data.email,
      });
    },
  });

  const onSubmit = (values: FormValues) => {
    try {
      if (id) {
        update(
          { id: Number(id), data: values },
          {
            onSuccess: () => {
              notification.success({ message: "You`re changes are saved successfully" });
              navigate("/web-management/users");
            },
            onError: (error) => {
              const newError = error as AxiosError<{ error: string }>;
              notification.error({ message: newError.response?.data?.error });
            },
          },
        );
      } else {
        create(values, {
          onSuccess: () => {
            notification.success({ message: "You`re changes are saved successfully" });
            navigate("/web-management/users");
          },
          onError: (error) => {
            const newError = error as AxiosError<{ error: string }>;
            notification.error({ message: errorMessage(newError.response?.data?.error) });
          },
        });
      }
    } catch {
      notification.error({ message: errorMessage() });
    }
  };

  const isLoading = isLoadingCreate || isLoadingUpdate;

  return {
    form,
    id,
    isLoading,
    navigate,
    onSubmit,
  };
};
