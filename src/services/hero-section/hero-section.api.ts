import { PostHeroSectionBodyType } from "./hero-section.types";
import { axiosInstance } from "@/configs/axios";

export const heroSectionServices = {
  postHeroSection: async (data: PostHeroSectionBodyType) => {
    const response = await axiosInstance({
      url: "/hero-section-and-partners",
      method: "post",
      data,
    });
    return response.data;
  },
};
