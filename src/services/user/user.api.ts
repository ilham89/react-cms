import { AxiosResponse } from "axios";

import {
  GetUserParamsType,
  GetUserResponseType,
  PostUserBodyType,
  PutUserBodyType,
} from "./user.types";
import { axiosInstance } from "@/configs/axios";
import { DataMetaResponseType, DataResponseType } from "@/types/response";

export const userService = {
  getUsers: async (params: GetUserParamsType) => {
    const response: AxiosResponse<DataMetaResponseType<GetUserResponseType[]>> =
      await axiosInstance({
        url: "/users",
        method: "get",
        params,
      });
    return response.data;
  },
  getUser: async (id: string) => {
    const response: AxiosResponse<DataResponseType<GetUserResponseType>> = await axiosInstance({
      url: `/users/${id}`,
      method: "get",
    });
    return response.data;
  },
  deleteUser: async (id: number) => {
    const response = await axiosInstance({
      url: `/users/${id}`,
      method: "delete",
    });
    return response.data;
  },
  postUser: async (data: PostUserBodyType) => {
    const response = await axiosInstance({
      url: "/users",
      method: "post",
      data,
    });
    return response.data;
  },
  putUser: async (id: number, data: PutUserBodyType) => {
    const response = await axiosInstance({
      url: `/users/${id}`,
      method: "put",
      data,
    });
    return response.data;
  },
};
