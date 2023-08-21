import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

import { productServices } from "./product.api";
import {
  GetProductResponseType,
  PostProductBodyType,
  PostProductLabelBodyType,
} from "./product.types";
import { DataResponseType } from "@/interfaces/response";

export const usePostProductService = () =>
  useMutation((data: PostProductBodyType) => productServices.postProduct(data));

export const usePostProductLabelsService = () =>
  useMutation((data: PostProductLabelBodyType) => productServices.postLabelProduct(data));

export const useGetProductService = (
  id: string,
  options:
    | (Omit<
        UseQueryOptions<
          DataResponseType<GetProductResponseType>,
          unknown,
          DataResponseType<GetProductResponseType>,
          string[]
        >,
        "initialData" | "queryFn" | "queryKey"
      > & { initialData?: (() => undefined) | undefined })
    | undefined,
) =>
  useQuery(["product"], () => productServices.getProduct(id), {
    ...options,
  });

export const useDeleteProductService = () =>
  useMutation((id: number) => productServices.deleteProduct(id));
