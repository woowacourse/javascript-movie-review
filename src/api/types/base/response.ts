export interface ApiSuccess<T> {
  data: T;
}
export interface ApiError {
  error: string;
}

export type ApiSuccessCallback<T> = (data: T) => void;
export type ApiErrorCallback = (error: string) => void;

export type BaseApiResponse<T> = ApiSuccess<T> | ApiError;
