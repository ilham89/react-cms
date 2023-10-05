export type GetColorResponseType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type PostColorBodyType = {
  name: string;
};

export type GetColorParamsType = {
  product_id: string;
};
