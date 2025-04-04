export interface BaseMovie {
  adult: boolean;
  backdrop_path: null | string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie extends BaseMovie {
  genre_ids: number[];
}

export interface DetailMovieData extends BaseMovie {
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
}

export interface MovieData {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}
