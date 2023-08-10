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

export type FaqCategoryBodyType = Pick<
  FaqCategoryResponseType,
  "name" | "short_description" | "status"
>;

export type FaqCategoryParamsType = {
  data: FaqCategoryBodyType;
  id: string;
};
