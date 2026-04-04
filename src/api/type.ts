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

export type Params = {
  page: number;
  query?: string | undefined;
  language?: string;
  region?: string;
};

export type Request = {
  path: string;
  params: Params;
};
