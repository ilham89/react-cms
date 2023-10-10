export type BaseResponseType = {
  // success: boolean;
  message: string;
  // code: number;
};

export type MetaResponseType = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export type DataResponseType<T> = BaseResponseType & {
  data: T;
};

export type DataMetaResponseType<T> = BaseResponseType &
  MetaResponseType & {
    data: T;
  };
