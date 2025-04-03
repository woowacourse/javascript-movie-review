import { ApiError, BaseApiResponse } from "../types/base/response";

export const isErrorResponse = <T>(
  response: BaseApiResponse<T>
): response is ApiError => {
  return "error" in response;
};
