import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

import { PostImageResponseType } from "./image.types";
import { DataResponseType } from "@/interfaces/response";

export const imageServices = {
  postImage: async (data: FormData) => {
    const token = Cookies.get("user_ct");
    const response: AxiosResponse<DataResponseType<PostImageResponseType>> = await axios({
      baseURL: import.meta.env.MODE === "development" ? "/dev" : import.meta.env.VITE_BASE_URL,
      url: "/upload-single-s3",
      method: "post",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
