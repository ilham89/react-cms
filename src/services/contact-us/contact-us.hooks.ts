import { useQuery } from "@tanstack/react-query";

import { contactUsServices } from "./contact-us.api";

export const useGetContactUsService = () =>
  useQuery(["contact-us"], () => contactUsServices.getContactUs());
