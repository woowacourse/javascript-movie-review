interface MovieData {
  page: number;
  results: MovieDataResult[];
  total_pages: number;
  total_results: number;
}

interface MovieDataResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

export { MovieData, MovieDataResult, Movie };
