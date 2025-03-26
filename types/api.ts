export interface ApiSuccess<T> {
  data: T;
}
export interface ApiError {
  error: string;
}

export type BaseApiResponse<T> = ApiSuccess<T> | ApiError;
