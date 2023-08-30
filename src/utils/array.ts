import { GetHeroPartnerResponseType } from "@/services/hero-partner/hero-partner.types";

export const updateOrder = (
  data: GetHeroPartnerResponseType[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(data);
  const [movedItem] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, movedItem);

  result.forEach((item, index) => {
    item.order_number = index;
  });

  return result;
};
