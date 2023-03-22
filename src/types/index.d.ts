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
  result: 'FETCH_SUCCESS' | 'FETCH_FAIL' | 'SYSTEM_CRASHED';
  status?: number;
  fetchStatus?: FetchStatusType;
  movieList?: MovieType[];
  isLastPage?: boolean = false;
}

export interface APIMovieResponseType {
  // fetch 실패했을 경우(상태코드가 나오는 경우)
  success?: boolean;
  status_code?: number;
  status_message?: string;

  // fetch 실패했을 경우(상태코드가 안 나오는 경우 - ex. 현재 페이지가 최대값 보다 클 경우)
  errors?: string[];

  // fetch 성공했을 경우
  total_pages?: number;
  results?: APIMovieType[];
}

export interface FetchStatusType {
  statusCode: number | undefined;
  statusMessage: string;
}
