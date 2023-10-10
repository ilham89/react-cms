export type GetUserResponseType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type GetUserParamsType = {
  page: number;
  per_page: number;
};

export type PostUserBodyType = {
  name: string;
  job: string;
};

export type PutUserBodyType = PostUserBodyType;
export type PutUserParamsType = {
  id: number;
  data: PutUserBodyType;
};
