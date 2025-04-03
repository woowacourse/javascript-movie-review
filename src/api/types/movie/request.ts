interface CommonApiRequest {
  page: number;
  language?: string;
  include_adult?: boolean;
}

export interface GetMoviesRequest extends CommonApiRequest {}

export interface SearchMoviesRequest extends CommonApiRequest {
  title: string;
}
