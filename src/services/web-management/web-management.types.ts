export type GetWebManagementResponseType = {
  id: number;
  name: string;
  description: string;
  admin_id: number;
  createdAt: string;
  updatedAt: string;
  title?: string;
};

export type PostWebManagementBodyType = {
  name: string;
  description: string;
  title?: string;
};

export type PutWebManagementBodyType = {
  description: string;
  title?: string;
};

export type PutWebManagementParamsType = {
  id: number;
  data: PutWebManagementBodyType;
};
