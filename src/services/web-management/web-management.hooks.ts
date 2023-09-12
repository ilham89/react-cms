import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

import { webManagementServices } from "./web-management.api";
import {
  GetWebManagementResponseType,
  PostWebManagementBodyType,
  PutWebManagementParamsType,
} from "./web-management.types";
import { DataResponseType } from "@/types/response";

export const usePostWebManagementService = () =>
  useMutation((data: PostWebManagementBodyType) => webManagementServices.postWebManagement(data));

export const useGetWebManagementsService = (
  options:
    | (Omit<
        UseQueryOptions<
          DataResponseType<GetWebManagementResponseType[]>,
          unknown,
          DataResponseType<GetWebManagementResponseType[]>,
          string[]
        >,
        "initialData" | "queryFn" | "queryKey"
      > & { initialData?: (() => undefined) | undefined })
    | undefined,
) =>
  useQuery(["web-managements"], () => webManagementServices.getWebManagements(), {
    ...options,
  });

export const usePutWebManagementService = () =>
  useMutation((params: PutWebManagementParamsType) =>
    webManagementServices.putWebManagement(params.id, params.data),
  );
