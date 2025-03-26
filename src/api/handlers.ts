import { BaseApiResponse } from "../../types/api";
import { isErrorResponse } from "./guards";

export function handleApiResponse<T>(
  response: BaseApiResponse<T>,
  onSuccess: (data: T) => void,
  onError?: (error: string) => void
) {
  if (isErrorResponse<T>(response)) {
    onError?.(response.error);
    return;
  }
  onSuccess(response as T);
}
