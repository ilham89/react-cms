import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

import { heroPartnerServices } from "./hero-partner.api";
import {
  GetHeroPartnerResponseType,
  PostHeroPartnerBodyType,
  PutHeroPartnerParamsType,
} from "./hero-partner.types";
import { DataResponseType } from "@/interfaces/response";

export const useGetHeroPartnersService = () =>
  useQuery(["hero-partners"], () => heroPartnerServices.getHeroPartners());

export const useGetHeroPartnerService = (
  id: string,
  options:
    | (Omit<
        UseQueryOptions<
          DataResponseType<GetHeroPartnerResponseType>,
          unknown,
          DataResponseType<GetHeroPartnerResponseType>,
          string[]
        >,
        "initialData" | "queryFn" | "queryKey"
      > & { initialData?: (() => undefined) | undefined })
    | undefined,
) => useQuery(["hero-partner"], () => heroPartnerServices.getHeroPartner(id), { ...options });

export const useDeleteHeroPartnerService = () =>
  useMutation((id: number) => heroPartnerServices.deleteHeroPartner(id));

export const usePostHeroPartnerService = () =>
  useMutation((data: PostHeroPartnerBodyType) => heroPartnerServices.postHeroPartner(data));

export const usePutHeroPartnerService = () =>
  useMutation((params: PutHeroPartnerParamsType) =>
    heroPartnerServices.putHeroPartner(params.id, params.data),
  );
