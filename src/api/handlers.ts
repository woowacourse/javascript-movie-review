import {
  ApiErrorCallback,
  ApiSuccessCallback,
  BaseApiResponse,
} from "../../types/api";
import { isErrorResponse } from "./guards";

export function handleApiResponse<T>(
  response: BaseApiResponse<T>,
  callbacks: {
    onSuccess: ApiSuccessCallback<T>;
    onError: ApiErrorCallback;
  }
) {
  if (isErrorResponse<T>(response)) {
    callbacks.onError(response.error);
    return;
  }
  callbacks.onSuccess(response as T);
}
