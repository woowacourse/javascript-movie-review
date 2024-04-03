type MovieItem = Pick<
  Movie,
  'id' | 'title' | 'vote_average' | 'poster_path' | 'overview' | 'genre_ids'
>;

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview?: string;
  genre_ids?: string[];
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_count: number;
}

interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
