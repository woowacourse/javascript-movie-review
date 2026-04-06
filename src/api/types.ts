export type MovieData = {
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
};

export type ResponseMovie = {
  results: MovieData[];
  page: number;
  total_pages: number;
};

type Params = {
  page: number;
  query?: string | undefined;
  language?: string;
  region?: string;
};

export type Request = {
  path: string;
  params: Params;
};

export interface TmdbErrorType {
  status_code: number;
  status_message: string;
  success: false;
}
