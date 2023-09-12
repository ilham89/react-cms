import { AcceptType, StatusType } from "@/types/status";

export type GetFaqResponseType = {
  id: number;
  question: string;
  answer: string;
  featured: AcceptType;
  faq_category_id: number;
  createdAt: string;
  updatedAt: string;
  status: StatusType;
  FAQCategory: {
    id: number;
    name: string;
  };
};

export type GetFaqParamsType = {
  limit: number;
  page: number;
  q: string;
  order_field?: string;
  order_by?: string;
  status?: string;
};

export type PostFaqBodyType = {
  question?: string;
  answer?: string;
  featured?: AcceptType;
  faq_category_id?: number;
  status: StatusType;
};

export type PostFaqParamsType = {
  data: PostFaqBodyType;
  id: string;
};
