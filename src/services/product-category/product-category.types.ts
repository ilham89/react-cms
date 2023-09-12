import { ColumnOrderByType, StatusType } from "@/types/status";

export type GetProductCategoryResponseType = {
  id: number;
  image: string;
  image_url: string;
  name: string;
  short_description: string;
  additional_info: {
    [key: string]: string[];
  };
  status: StatusType;
  createdAt: string;
  updatedAt: string;
  Products: { id: number }[];
};

export type GetProductCategoryParamsType = {
  page: number;
  limit: number;
  order_by?: ColumnOrderByType;
  order_field?: string;
};

export type PostProductCategoryBodyType = {
  image: string;
  name: string;
  short_description: string;
  additional_info?: {
    [key: string]: string[];
  };
  status: StatusType;
};

export type PutProductCategoryBodyType = PostProductCategoryBodyType;
export type PutProductCategoryParamsType = {
  id: number;
  data: Pick<PutProductCategoryBodyType, "status">;
};
