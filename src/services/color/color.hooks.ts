import { useMutation, useQuery } from "@tanstack/react-query";

import { colorServices } from "./color.api";
import { PostColorBodyType } from "./color.types";

export const useGetColorService = (product_id: string) =>
  useQuery(["colors", product_id], () => colorServices.getColors({ product_id }), {
    select: ({ data }) => data,
  });

export const usePostColorService = () =>
  useMutation((data: PostColorBodyType) => colorServices.createColor(data));

export const useDeleteColorService = () =>
  useMutation((id: number) => colorServices.deleteColor(id));
