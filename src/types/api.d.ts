type HTTPStatusCode =
  | '200'
  | '301'
  | '400'
  | '403'
  | '404'
  | '408'
  | '500'
  | '502';

interface Params {
  [key: string]: string | number | boolean;
}

interface FetchOptions {
  url: string;
  options: {
    method: string;
    headers: {
      accept: string;
      Authorization: string;
    };
  };
}

interface FetchProps {
  onError: (statusCode: HTTPStatusCode) => void;
  onLoading: () => void;
}

interface FetchSearchMoviesProps extends FetchProps {
  onSuccess: (data: MovieListResponse) => void;
}

interface FetchPopularMoviesProps extends FetchProps {
  onSuccess: (data: MovieListResponse) => void;
}

interface FetchMovieDetailProps extends FetchProps {
  onSuccess: (data: MovieDetailResponse) => void;
  id: number;
}
