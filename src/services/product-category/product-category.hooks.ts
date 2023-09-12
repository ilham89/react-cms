import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

import { productCategoryServices } from "./product-category.api";
import {
  GetProductCategoryResponseType,
  PostProductCategoryBodyType,
  PutProductCategoryParamsType,
} from "./product-category.types";
import { DataResponseType } from "@/types/response";

export const useDeleteProductCategoryService = () =>
  useMutation((id: number) => productCategoryServices.deleteProductCategory(id));

export const usePostProductCategoryService = () =>
  useMutation((data: PostProductCategoryBodyType) =>
    productCategoryServices.postProductCategory(data),
  );

export const usePutProductCategoryService = () =>
  useMutation((params: PutProductCategoryParamsType) =>
    productCategoryServices.putProductCategory(params.id, params.data),
  );

export const useGetProductCategoryService = (
  id: string,
  options:
    | (Omit<
        UseQueryOptions<
          DataResponseType<GetProductCategoryResponseType>,
          unknown,
          DataResponseType<GetProductCategoryResponseType>,
          string[]
        >,
        "initialData" | "queryFn" | "queryKey"
      > & { initialData?: (() => undefined) | undefined })
    | undefined,
) =>
  useQuery(["product-category"], () => productCategoryServices.getProductCategory(id), {
    ...options,
  });
