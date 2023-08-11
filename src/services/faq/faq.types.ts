export enum FeaturedFaqEnum {
  Yes = "Yes",
  No = "No",
}
export type GetFaqResponseType = {
  id: number;
  question: string;
  answer: string;
  featured: FeaturedFaqEnum;
  faq_category_id: number;
  admin_id: number;
  createdAt: string;
  updatedAt: string;
};

export type PostFaqBodyType = {
  question: string;
  answer: string;
  featured: FeaturedFaqEnum;
  faq_category_id: number;
};
