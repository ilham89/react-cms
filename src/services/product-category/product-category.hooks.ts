import { useMutation } from "@tanstack/react-query";

import { productCategoryServices } from "./product-category.api";

export const useDeleteProductCategoryService = () =>
  useMutation((id: number) => productCategoryServices.deleteProductCategory(id));
