import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

import { heroSectionServices } from "./hero-section.api";
import {
  GetHeroSectionResponseType,
  PostHeroSectionBodyType,
  PutHeroSectionParamsType,
} from "./hero-section.types";
import { DataResponseType } from "@/interfaces/response";

export const useGetHeroSectionsService = () =>
  useQuery(["hero-sections"], () => heroSectionServices.getHeroSections());

export const useGetHeroSectionService = (
  id: string,
  options:
    | (Omit<
        UseQueryOptions<
          DataResponseType<GetHeroSectionResponseType>,
          unknown,
          DataResponseType<GetHeroSectionResponseType>,
          string[]
        >,
        "initialData" | "queryFn" | "queryKey"
      > & { initialData?: (() => undefined) | undefined })
    | undefined,
) => useQuery(["hero-section"], () => heroSectionServices.getHeroSection(id), { ...options });

export const useDeleteHeroSectionService = () =>
  useMutation((id: number) => heroSectionServices.deleteHeroSection(id));

export const usePostHeroSectionService = () =>
  useMutation((data: PostHeroSectionBodyType) => heroSectionServices.postHeroSection(data));

export const usePutHeroSectionService = () =>
  useMutation((params: PutHeroSectionParamsType) =>
    heroSectionServices.putHeroSection(params.id, params.data),
  );
