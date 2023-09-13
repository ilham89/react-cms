import { GetColorResponseType } from "../color/color.types";
import { GetMaterialResponseType } from "../material/material.types";
import { GetSizeResponseType } from "../size/size.types";
import { ColumnOrderByType, StatusType } from "@/types/status";

export type ProductCategoryType = {
  id: number;
  name: string;
};

export type GetProductResponseType = {
  id: number;
  main_image: string;
  main_image_url: string;
  images: string[];
  images_url: string[];
  name: string;
  information: string;
  description: string;
  order_minimum: number;
  label: string[];
  brochure: string;
  brochure_url: string;
  additional_info: any[];
  category_id: number;
  createdAt: string;
  updatedAt: string;
  ProductCategory: ProductCategoryType;
  Variants: VariantResponseType[];
};

export type PostProductBodyType = {
  main_image: string;
  images: string[];
  name: string;
  category_id: number;
  information: string;
  description: string;
  order_minimum: number;
  label: string[];
  brochure: string;
  variants: VariantBodyType[];
};

export type PutProductBodyType = PostProductBodyType;

export type GetProductParamsType = {
  limit: number;
  page: number;
  q: string;
  order_by?: ColumnOrderByType;
  order_field?: string;
  status?: StatusType;
};

export type GetProductLabelResponseType = {
  id: number;
  name: string;
  admin_id: number;
  createdAt: string;
  updatedAt: string;
};

export type PostProductLabelBodyType = {
  name: string;
};

export type PutProductParamsType = {
  id: number;
  data: PutProductBodyType;
};

export type VariantBodyType = {
  size: string;
  material_id: number;
  color_id: number;
  sku: string;
  price: number;
  id?: number;
};

type VariantResponseType = {
  id: number;
  price: number;
  sku: string;
  product_id: number;
  material_id: number;
  color_id: number;
  size_id: number;
  createdAt: string;
  updatedAt: string;
  Size: GetSizeResponseType;
  Material: GetMaterialResponseType;
  Color: GetColorResponseType;
};
