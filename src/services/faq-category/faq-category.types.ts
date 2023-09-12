import { StatusType } from "@/types/status";

export type GetFaqCategoryResponseType = {
  id: number;
  name: string;
  short_description: string;
  status: StatusType;
  admin_id: number;
  createdAt: string;
  updatedAt: string;
  FAQs: {
    id: string;
  }[];
};

export type PostFaqCategoryBodyType = {
  name?: string;
  short_description?: string;
  status: StatusType;
};

export type PutFaqCategoryParamsType = {
  data: PostFaqCategoryBodyType;
  id: string;
};

export type GetFaqCategoryParamsType = {
  limit: number;
  page: number;
};
