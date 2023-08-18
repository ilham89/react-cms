import { useMutation } from "@tanstack/react-query";

import { productCategoryServices } from "./product-category.api";
import {
  PostProductCategoryBodyType,
  PutProductCategoryParamsType,
} from "./product-category.types";

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
