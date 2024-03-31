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
  onError: (res: Response) => void;
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
