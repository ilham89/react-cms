export type BaseResponseType = {
  // success: boolean;
  message: string;
  // code: number;
};

export type DataResponseType<T> = BaseResponseType & {
  data: T;
};

export type DataMetaResponseType<T> = BaseResponseType & {
  data: {
    data: T;
    total_data: number;
    total_page: number;
    current_page: number;
    page_limit: number;
  };
};
