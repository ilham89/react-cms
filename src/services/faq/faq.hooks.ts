import { useMutation, useQuery } from "@tanstack/react-query";

import { faqServices } from "./faq.api";
import { PostFaqBodyType } from "./faq.types";

export const useGetFaqsService = () => useQuery(["faqs"], () => faqServices.getFaqs());

export const usePostFaqService = () =>
  useMutation((data: PostFaqBodyType) => faqServices.postFaq(data));

export const useDeleteFaqService = () => useMutation((id: number) => faqServices.deleteFaq(id));
