interface MetaData {
  limit: number;
  page: number;
  total: number;
  totalPage?: number;
}

export interface Responses<T = any> {
  success: boolean;
  data: T;
  metadata: MetaData;
}

export interface Response<T = any> {
  success: boolean;
  data: T;
}
