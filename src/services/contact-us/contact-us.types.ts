export type GetContactUsResponseType = {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type GetContactUsParamsType = {
  limit: number;
  page: number;
  q?: string;
  order_field?: string;
  order_by?: string;
};
