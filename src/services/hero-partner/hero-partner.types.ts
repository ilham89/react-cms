export type GetHeroPartnerResponseType = {
  id: number;
  image: string;
  name: string;
  type: string;
  description: string;
  admin_id: number;
  createdAt: string;
  updatedAt: string;
  image_url: string;
};

export type PostHeroPartnerBodyType = {
  name: string;
  description: string;
  image: string;
  type?: string;
};

export type PutHeroPartnerBodyType = {
  name: string;
  description: string;
  image: string;
};

export type PutHeroPartnerParamsType = {
  id: string;
  data: PutHeroPartnerBodyType;
};

export type GetHeroPartnerParamsType = {
  type: string;
};
