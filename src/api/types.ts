export type MovieData = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
};

type Genres = {
  name: string;
};
export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genres: Genres[];
  vote_average: string;
  release_date: string;
};

export type ResponseMovie = {
  results: MovieData[];
  page: number;
  total_pages: number;
};

type Params = {
  page?: number;
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
