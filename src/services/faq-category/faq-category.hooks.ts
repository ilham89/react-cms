import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

import { faqCategoryServices } from "./faq-category.api";
import {
  PostFaqCategoryBodyType,
  GetFaqCategoryParamsType,
  GetFaqCategoryResponseType,
} from "./faq-category.types";
import { DataResponseType } from "@/interfaces/response";

export const useGetFaqCategoriesService = () =>
  useQuery(["faq-categories"], () => faqCategoryServices.getFaqCategories());

export const usePostFaqCategoryService = () =>
  useMutation((data: PostFaqCategoryBodyType) => faqCategoryServices.postFaqCategory(data));

export const useGetFaqCategoryService = (
  id: string,
  options:
    | (Omit<
        UseQueryOptions<
          DataResponseType<GetFaqCategoryResponseType>,
          unknown,
          DataResponseType<GetFaqCategoryResponseType>,
          string[]
        >,
        "initialData" | "queryFn" | "queryKey"
      > & { initialData?: (() => undefined) | undefined })
    | undefined,
) =>
  useQuery(["faq-category"], () => faqCategoryServices.getFaqCategory(id), {
    ...options,
  });

export const usePutFaqCategoryService = () =>
  useMutation((params: GetFaqCategoryParamsType) =>
    faqCategoryServices.putFaqCategory(params.id, params.data),
  );

export const useDeleteFaqCategoryService = () =>
  useMutation((id: number) => faqCategoryServices.deleteFaqCategory(id));
