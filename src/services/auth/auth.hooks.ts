import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { authServices } from "./auth.api";
import { PostLoginBodyType } from "./auth.types";

export const usePostLoginService = () =>
  useMutation((data: PostLoginBodyType) => authServices.postLogin(data), {
    onSuccess: ({ access_token }) => {
      Cookies.set("user_ct", access_token);
    },
  });
