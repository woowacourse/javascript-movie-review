import { ApiError, BaseApiResponse } from "../../types/api";

export const isErrorResponse = <T>(
  response: BaseApiResponse<T>
): response is ApiError => {
  return "error" in response;
};
