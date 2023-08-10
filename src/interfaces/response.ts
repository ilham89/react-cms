export type BaseResponseType = {
  // success: boolean;
  message: string;
  // code: number;
};

export type DataResponseType<T> = BaseResponseType & {
  data: T;
};
