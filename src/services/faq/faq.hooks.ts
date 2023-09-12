import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

import { faqServices } from "./faq.api";
import { GetFaqResponseType, PostFaqBodyType, PostFaqParamsType } from "./faq.types";
import { DataResponseType } from "@/types/response";

export const useGetFaqService = (
  id: string,
  options:
    | (Omit<
        UseQueryOptions<
          DataResponseType<GetFaqResponseType>,
          unknown,
          DataResponseType<GetFaqResponseType>,
          string[]
        >,
        "initialData" | "queryFn" | "queryKey"
      > & { initialData?: (() => undefined) | undefined })
    | undefined,
) =>
  useQuery(["faq"], () => faqServices.getFaq(id), {
    ...options,
  });

export const usePostFaqService = () =>
  useMutation((data: PostFaqBodyType) => faqServices.postFaq(data));

export const useDeleteFaqService = () => useMutation((id: number) => faqServices.deleteFaq(id));

export const usePutFaqService = () =>
  useMutation((params: PostFaqParamsType) => faqServices.putFaq(params.id, params.data));
