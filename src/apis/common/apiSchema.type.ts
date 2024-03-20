export type HTTPMethod = 'GET';

export interface BaseResponse<T> {
  results: T;
}
