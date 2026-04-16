interface movieResponse {
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

interface MovieItem {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genres: Genre[];
  overview: string;
}

interface Genre {
  id: number;
  name: string;
}
