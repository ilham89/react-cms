import { AxiosResponse } from "axios";

import {
  GetHeroPartnerParamsType,
  GetHeroPartnerResponseType,
  PostHeroPartnerBodyType,
  PutHeroPartnerBodyType,
  PutHeroPartnerOrderBodyType,
} from "./hero-partner.types";
import { axiosInstance } from "@/configs/axios";
import { DataResponseType } from "@/types/response";

export const heroPartnerServices = {
  getHeroPartners: async (params: GetHeroPartnerParamsType) => {
    const response: AxiosResponse<DataResponseType<GetHeroPartnerResponseType[]>> =
      await axiosInstance({
        url: "/hero-section-and-partners",
        method: "get",
        params,
      });
    return response.data;
  },
  getHeroPartner: async (id: string) => {
    const response: AxiosResponse<DataResponseType<GetHeroPartnerResponseType>> =
      await axiosInstance({
        url: `/hero-section-and-partners/${id}`,
        method: "get",
      });
    return response.data;
  },
  postHeroPartner: async (data: PostHeroPartnerBodyType) => {
    const response = await axiosInstance({
      url: "/hero-section-and-partners",
      method: "post",
      data,
    });
    return response.data;
  },
  putHeroPartner: async (id: string, data: PutHeroPartnerBodyType) => {
    const response = await axiosInstance({
      url: `/hero-section-and-partners/${id}`,
      method: "put",
      data,
    });
    return response.data;
  },
  deleteHeroPartner: async (id: number) => {
    const response = await axiosInstance({
      url: `/hero-section-and-partners/${id}`,
      method: "delete",
    });
    return response.data;
  },
  orderHeroPartner: async (data: PutHeroPartnerOrderBodyType) => {
    const response = await axiosInstance({
      url: `/hero-section-and-partners/order`,
      method: "put",
      data,
    });
    return response.data;
  },
};
