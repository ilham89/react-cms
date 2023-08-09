import { useNavigate } from "react-router-dom";

import { FormValues } from "./login.types";
import { usePostLoginService } from "@/services/auth/auth.hooks";

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate } = usePostLoginService();

  const onFinish = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => navigate("/"),
    });
  };

  return {
    onFinish,
  };
};
