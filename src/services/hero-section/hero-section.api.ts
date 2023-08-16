import { AxiosResponse } from "axios";

import {
  GetHeroSectionResponseType,
  PostHeroSectionBodyType,
  PutHeroSectionBodyType,
} from "./hero-section.types";
import { axiosInstance } from "@/configs/axios";
import { DataResponseType } from "@/interfaces/response";

export const heroSectionServices = {
  getHeroSections: async () => {
    const response: AxiosResponse<DataResponseType<GetHeroSectionResponseType[]>> =
      await axiosInstance({
        url: "/hero-section-and-partners?type=Hero Sections",
        method: "get",
      });
    return response.data;
  },
  getHeroSection: async (id: string) => {
    const response: AxiosResponse<DataResponseType<GetHeroSectionResponseType>> =
      await axiosInstance({
        url: `/hero-section-and-partners/${id}`,
        method: "get",
      });
    return response.data;
  },
  postHeroSection: async (data: PostHeroSectionBodyType) => {
    const response = await axiosInstance({
      url: "/hero-section-and-partners",
      method: "post",
      data,
    });
    return response.data;
  },
  putHeroSection: async (id: string, data: PutHeroSectionBodyType) => {
    const response = await axiosInstance({
      url: `/hero-section-and-partners/${id}`,
      method: "put",
      data,
    });
    return response.data;
  },
  deleteHeroSection: async (id: number) => {
    const response = await axiosInstance({
      url: `/hero-section-and-partners/${id}`,
      method: "delete",
    });
    return response.data;
  },
};
