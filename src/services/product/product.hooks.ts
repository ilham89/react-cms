import { useMutation } from "@tanstack/react-query";

import { productServices } from "./product.api";
import { PostProductBodyType } from "./product.types";

export const usePostProductService = () =>
  useMutation((data: PostProductBodyType) => productServices.postProduct(data));
