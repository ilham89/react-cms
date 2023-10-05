import { useMutation, useQuery } from "@tanstack/react-query";

import { materialServices } from "./material.api";
import { PostMaterialBodyType } from "./material.types";

export const useGetMaterialService = (productId: string) =>
  useQuery(
    ["materials", productId],
    () => materialServices.getMaterials({ product_id: productId }),
    {
      select: ({ data }) => data,
      enabled: !!productId,
    },
  );

export const useDeleteMaterialService = () =>
  useMutation((id: number) => materialServices.deleteMaterial(id));

export const usePostMaterialService = () =>
  useMutation((data: PostMaterialBodyType) => materialServices.createMaterial(data));
