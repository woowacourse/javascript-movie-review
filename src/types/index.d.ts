export interface MovieType {
  title: string;
  posterPath: string;
  voteAverage: number;
}

export interface APIMovieType {
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface MovieResponseType {
  result: string;
  status?: number;
  fetchStatus?: FetchStatusType;
  movieList?: MovieType[];
  isLastPage?: boolean = false;
}
export interface APIResponseType {
  success?: boolean;
  status_code?: number;
  status_message?: string;
  errors?: string[];
  total_pages?: number;
  results?: MovieResponseType[];
}

export interface FetchStatusType {
  statusCode: number | undefined;
  statusMessage: string;
}
