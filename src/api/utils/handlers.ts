import {
  ApiErrorCallback,
  ApiSuccessCallback,
  BaseApiResponse,
} from "../types/base/response";
import { isErrorResponse } from "./guards";

export function handleApiResponse<T>(
  response: BaseApiResponse<T>,
  callbacks: {
    onSuccess: ApiSuccessCallback<T>;
    onError?: ApiErrorCallback;
  }
) {
  if (callbacks.onError && isErrorResponse<T>(response)) {
    callbacks.onError(response.error);
    return;
  }
  callbacks.onSuccess(response as T);
}
