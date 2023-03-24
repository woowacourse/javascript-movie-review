type MovieApiType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieListApiType = {
  page: number;
  results: MovieApiType[];
  total_pages: number;
  total_results: number;
};

export type MovieItemType = {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
};

export type FetchingMovieType = {
  movieList: MovieListApiType;
  status: number;
};

export type MovieSubscriberType = {
  movies: ((value?: MovieItemType[]) => void)[];
  loading: (() => void)[];
  detail: ((value?: object) => void)[];
};

export type DetailModalType = {
  title: string;
  poster_path: string;
  genres: object[];
  vote_average: number;
  overview: string;
};
