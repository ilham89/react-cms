import { useQuery } from "@tanstack/react-query";

import { sizeServices } from "./size.api";

export const useGetSizeService = () =>
  useQuery(["sizes"], () => sizeServices.getSizes(), {
    select: ({ data }) => data,
  });
