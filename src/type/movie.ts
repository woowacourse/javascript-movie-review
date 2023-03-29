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

export type MovieDetailType = {
  id: number;
  title: string;
  genres: GenreType[];
  overview: string;
  poster_path: string;
  vote_average: number;
};

export type MovieDetailStringGenreType = {
  id: number;
  title: string;
  genres: string;
  overview: string;
  poster_path: string;
  vote_average: number;
};

export type GenreType = {
  id: number;
  name: string;
};

export type FetchingMovieType = {
  movieList: MovieListApiType;
  status: number;
};

export type FetchingDetailOfMovieType = {
  movieItem: MovieDetailType;
  status: number;
};

export type MovieSubscriberType = {
  movies: ((value?: MovieItemType[]) => void)[];
  loading: (() => void)[];
  unloading: (() => void)[];
  detail: ((value?: object) => void)[];
  error: (() => void)[];
  noSearched: (() => void)[];
};

export type StarKeyType = 1 | 2 | 3 | 4 | 5;

export type StarConditionType = {
  1: boolean[];
  2: boolean[];
  3: boolean[];
  4: boolean[];
  5: boolean[];
};

export type StarMentType = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
};
