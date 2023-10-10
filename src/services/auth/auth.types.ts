export type PostLoginBodyType = {
  email: string;
  password: string;
};

export type PostLoginResponseType = {
  message: string;
  token: string;
};
