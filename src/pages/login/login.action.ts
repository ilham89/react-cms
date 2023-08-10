import { useNavigate } from "react-router-dom";

import { FormValues } from "./login.types";
import useNotification from "@/hooks/useNotification";
import { usePostLoginService } from "@/services/auth/auth.hooks";
import useUser from "@/stores/user";

export const useLogin = () => {
  const navigate = useNavigate();
  const { addError, addSuccess } = useNotification();
  const { mutate, isLoading } = usePostLoginService();
  const [setUserItem] = useUser((state) => [state.setUserItem]);

  const onFinish = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => {
        setUserItem({ logged: true });
        addSuccess("Welcome to dashboard!");
        navigate("/");
      },
      onError() {
        addError("Something went wrong!");
      },
    });
  };

  return {
    onFinish,
    isLoading,
  };
};
