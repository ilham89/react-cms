import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

import { faqCategoryServices } from "./faq-category.api";
import {
  FaqCategoryBodyType,
  FaqCategoryParamsType,
  FaqCategoryResponseType,
} from "./faq-category.types";
import { DataResponseType } from "@/interfaces/response";

export const useGetFaqCategoriesService = () =>
  useQuery(["faq-categories"], () => faqCategoryServices.getFaqCategories());

export const usePostFaqCategoryService = () =>
  useMutation((data: FaqCategoryBodyType) => faqCategoryServices.postFaqCategory(data));

export const useGetFaqCategoryService = (
  id: string,
  options:
    | (Omit<
        UseQueryOptions<
          DataResponseType<FaqCategoryResponseType>,
          unknown,
          DataResponseType<FaqCategoryResponseType>,
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
  useMutation((params: FaqCategoryParamsType) =>
    faqCategoryServices.putFaqCategory(params.id, params.data),
  );
