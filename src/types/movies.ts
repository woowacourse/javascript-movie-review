export interface FetchResponse<T> {
  results: T;
}

interface MovieFiledCommonResponse {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  original_language: string;
  overview: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieItemResponse extends MovieFiledCommonResponse {
  genre_ids: number[];
}

export interface MovieDetailResponse extends MovieFiledCommonResponse {
  belongs_to_collection: any;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  imdb_id: string;
  production_companies: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue: number;
  runtime: number | null;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
}

export interface MovieItem extends Pick<MovieItemResponse, "id" | "title"> {
  imagePath: string;
  voteAverage: number;
}

export interface MovieDetailItem extends Pick<MovieItem, "id" | "title" | "imagePath" | "voteAverage"> {
  genres: string[];
  overview: string;
}
