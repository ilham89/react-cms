export enum FaqStatusEnum {
  Active = "Active",
  Inactive = "Inactive",
}

export enum FeaturedFaqEnum {
  Yes = "Yes",
  No = "No",
}
export type GetFaqResponseType = {
  id: number;
  question: string;
  answer: string;
  featured: FeaturedFaqEnum;
  faq_category_id: number;
  createdAt: string;
  updatedAt: string;
  status: FaqStatusEnum;
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
  featured?: FeaturedFaqEnum;
  faq_category_id?: number;
  status: FaqStatusEnum;
};

export type PostFaqParamsType = {
  data: PostFaqBodyType;
  id: string;
};
