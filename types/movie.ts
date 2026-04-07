export interface Movie {
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

export interface MovieResponse {
  movies: Movie[];
  nowPage: number;
  totalPages: number;
}

export interface MovieDetail {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  vote_average: number;
  overview: string;
}

export type ThumbnailInfo = Pick<
  Movie,
  "id" | "title" | "poster_path" | "vote_average"
>;
