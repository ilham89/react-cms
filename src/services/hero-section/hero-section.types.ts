export type GetHeroSectionResponseType = {
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

export type PostHeroSectionBodyType = {
  name: string;
  description: string;
  image: string;
  type?: string;
};

export type PutHeroSectionBodyType = {
  name: string;
  description: string;
  image: string;
};

export type PutHeroSectionParamsType = {
  id: string;
  data: PutHeroSectionBodyType;
};
