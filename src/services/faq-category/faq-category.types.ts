export enum FaqCategoryStatusEnum {
  Active = "Active",
  Inactive = "Inactive",
}

export type FaqCategoryResponseType = {
  id: number;
  name: string;
  short_description: string;
  status: FaqCategoryStatusEnum;
  admin_id: number;
  createdAt: string;
  updatedAt: string;
};

export type FaqCategoryBodyType = {
  name?: string;
  short_description?: string;
  status: FaqCategoryStatusEnum;
};

export type FaqCategoryParamsType = {
  data: FaqCategoryBodyType;
  id: string;
};
