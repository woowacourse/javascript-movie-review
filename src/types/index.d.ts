export interface Movie {
  title: string;
  posterPath: string;
  voteAverage: number;
}

export interface RawMovie {
  title: string;
  poster_path: string;
  vote_average: number;
}
export interface FetchMoviesResult {
  statusCode: number | undefined = undefined;
  statusMessage: string;
  movieList: MovieType[] = [];
  isLastPage: boolean = false;
}

export interface APIMovieResponseData {
  // fetch 성공한 경우(response.ok===true)
  total_pages: number = 0;
  results?: APIMovieType[] = [];

  // fetch 실패(response.ok===false)한 경우(API상태코드가 나오는 경우)
  success?: boolean;
  status_code?: number;
  status_message: string = '';

  // fetch 실패(response.ok===false)한 경우(API상태코드가 안 나오는 경우 - ex. 현재 페이지가 최대값 보다 클 경우)
  errors: string[] = ['Not Valid Error'];
}

export interface ResponseParsedData {
  statusCode: number | undefined;
  statusMessage: string;
  totalPages?: number;
  rawMovieList?: APIMovieType[];
}
