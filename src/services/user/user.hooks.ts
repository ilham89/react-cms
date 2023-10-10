import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

import { userService } from "./user.api";
import { GetUserResponseType, PostUserBodyType, PutUserParamsType } from "./user.types";
import { DataResponseType } from "@/types/response";

export const useGetUserService = (
  id: string,
  options:
    | (Omit<
        UseQueryOptions<
          DataResponseType<GetUserResponseType>,
          unknown,
          DataResponseType<GetUserResponseType>,
          string[]
        >,
        "initialData" | "queryFn" | "queryKey"
      > & { initialData?: (() => undefined) | undefined })
    | undefined,
) =>
  useQuery(["user"], () => userService.getUser(id), {
    ...options,
  });

export const useDeleteUserService = () => useMutation((id: number) => userService.deleteUser(id));

export const usePostUserService = () =>
  useMutation((data: PostUserBodyType) => userService.postUser(data));

export const usePutUserService = () =>
  useMutation((params: PutUserParamsType) => userService.putUser(params.id, params.data));
