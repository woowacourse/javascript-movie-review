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

interface MovieModalData {
  title: string;
  release_date: string;
  genres: Genre[];
  vote_average: number;
  poster_path: string;
  overview: string;
  vote_average: number;
};

interface Genre {
  id: number;
  name: string;
};

type ApiResult<T> = 
  | { success: true, data: T }
  | { success: false, error: string };
