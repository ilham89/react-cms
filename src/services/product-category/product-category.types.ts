export enum ProductCategoryStatusEnum {
  Active = "Active",
  Inactive = "Inactive",
}

export type GetProductCategoryResponseType = {
  id: number;
  image: string;
  image_url: string;
  name: string;
  short_description: string;
  size: string[];
  color: string[];
  material: string[];
  additional_info: {
    [key: string]: string[];
  };
  status: ProductCategoryStatusEnum;
  createdAt: string;
  updatedAt: string;
  Products: { id: number }[];
};

export type GetProductCategoryParamsType = {
  page: number;
  limit: number;
  order_by?: string;
  order_field?: string;
};

export type PostProductCategoryBodyType = {
  image: string;
  name: string;
  short_description: string;
  size: string[];
  color: string[];
  material: string[];
  additional_info?: {
    [key: string]: string[];
  };
  status: ProductCategoryStatusEnum;
};

export type PutProductCategoryBodyType = PostProductCategoryBodyType;
export type PutProductCategoryParamsType = {
  id: number;
  data: Pick<PutProductCategoryBodyType, "status">;
};
