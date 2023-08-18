import { useMutation } from "@tanstack/react-query";

import { productServices } from "./product.api";
import { PostProductBodyType, PostProductLabelBodyType } from "./product.types";

export const usePostProductService = () =>
  useMutation((data: PostProductBodyType) => productServices.postProduct(data));

export const usePostProductLabelsService = () =>
  useMutation((data: PostProductLabelBodyType) => productServices.postLabelProduct(data));
