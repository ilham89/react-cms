export type ProductCategoryType = {
  id: number;
  name: string;
};

export type GetProductResponseType = {
  id: number;
  main_image: string;
  images: string[];
  name: string;
  information: string;
  description: string;
  price: number;
  order_minimum: number;
  label: string[];
  color: string;
  size: string;
  material: string;
  brochure: string;
  additional_info: string;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  ProductCategory: ProductCategoryType;
};

export type PostProductBodyType = {
  main_image: string;
  images: string[];
  name: string;
  category_id: number;
  information: string;
  description: string;
  price: number;
  order_minimum: number;
  label: string[];
  color: string;
  size: string;
  material: string;
  brochure: string;
};

export type PutProductBodyType = PostProductBodyType;

export type GetProductParamsType = {
  limit: number;
  page: number;
  q: string;
  order_by?: string;
  order_field?: string;
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
