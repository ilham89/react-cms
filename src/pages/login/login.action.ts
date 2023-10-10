import { notification } from "antd";
import { useNavigate } from "react-router-dom";

import { FormValues } from "./login.types";
import { usePostLoginService } from "@/services/auth/auth.hooks";
import useUser from "@/stores/user";
import { errorMessage } from "@/utils/message";

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = usePostLoginService();
  const [setUserItem] = useUser((state) => [state.setUserItem]);

  const onFinish = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => {
        setUserItem({ logged: true });
        notification.success({ message: "Welcome to dashboard!" });
        navigate("/");
      },
      onError: () => notification.error({ message: errorMessage() }),
    });
  };

  return {
    onFinish,
    isLoading,
  };
};
