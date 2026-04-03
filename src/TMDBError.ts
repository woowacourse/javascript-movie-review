import { TmdbError as ServerError } from "./utils/tmdbFetcher";

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
