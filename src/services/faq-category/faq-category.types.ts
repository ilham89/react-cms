export enum FaqCategoryStatusEnum {
  Active = "Active",
  Inactive = "Inactive",
}

export type GetFaqCategoryResponseType = {
  id: number;
  name: string;
  short_description: string;
  status: FaqCategoryStatusEnum;
  admin_id: number;
  createdAt: string;
  updatedAt: string;
};

export type PostFaqCategoryBodyType = {
  name?: string;
  short_description?: string;
  status: FaqCategoryStatusEnum;
};

export type GetFaqCategoryParamsType = {
  data: PostFaqCategoryBodyType;
  id: string;
};
