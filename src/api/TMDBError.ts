import { TmdbErrorType as ServerError } from './types.ts';

class TMDBError extends Error {
  code: number;
  success: false;

  constructor({ status_code, status_message, success }: ServerError) {
    super(status_message);
    this.code = status_code;
    this.success = success;
  }
}
export default TMDBError;

export const isTmdbError = (error: unknown): error is TMDBError => {
  return error instanceof Object && 'status_code' in error && 'status_message' in error && 'success' in error;
};
