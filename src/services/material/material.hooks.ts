import { useMutation, useQuery } from "@tanstack/react-query";

import { materialServices } from "./material.api";
import { PostMaterialBodyType } from "./material.types";

export const useGetMaterialService = () =>
  useQuery(["materials"], () => materialServices.getMaterials(), {
    select: ({ data }) => data,
  });

export const useDeleteMaterialService = () =>
  useMutation((id: number) => materialServices.deleteMaterial(id));

export const usePostMaterialService = () =>
  useMutation((data: PostMaterialBodyType) => materialServices.createMaterial(data));
