interface MovieResponse {
  page: number;
  results: Movies[];
  total_pages: number;
  total_results: number;
}

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

type ApiResult<T> = 
  | { success: true, data: T }
  | { success: false, error: string };
