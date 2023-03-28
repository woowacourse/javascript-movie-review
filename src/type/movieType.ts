export interface ApiMovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  overview: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieItem {
  id: number;
  title: string;
  src: string;
  starRate: number;
  genres: string;
  description: string;
}

export interface MovieAppData {
  status: "fulfilled";
  movies: MovieItem[];
  searchWord: string;
  page: number;
  totalPages: number;
  isShowMore: boolean;
}

export interface ApiMovie {
  status: "fulfilled";
  page: number;
  total_pages: number;
  results: ApiMovieItem[];
  total_results: number;
}

export interface ApiError {
  status: "rejected";
  error: number;
  errorMessage: string;
}

export interface State {
  status: Status;
  data: MovieAppData | MovieItem | Error | {};
}

export type Subscriber = (state: State) => void;

export type Status = "loading" | "success" | "failure";

export interface MovieGenreApi {
  id: number;
  name: string;
}

export interface Genre {
  [key: number]: string;
}

export type Constant = Readonly<{
  [key: string]: string;
}>;
