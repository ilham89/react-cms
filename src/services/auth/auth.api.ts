import { PostLoginBodyType, PostLoginResponseType } from "./auth.types";
import { axiosInstance } from "@/configs/axios";

export const authServices = {
  postLogin: async (data: PostLoginBodyType): Promise<PostLoginResponseType> => {
    const response = await axiosInstance({
      url: "/login",
      method: "post",
      data,
    });
    return response.data;
  },
};
