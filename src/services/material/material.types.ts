export type GetMaterialResponseType = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type PostMaterialBodyType = {
  title: string;
};

export type GetMaterialParamsType = {
  product_id: string;
};
