export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_idx: number[];
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

export type ThumbnailInfo = Pick<
  Movie,
  "title" | "poster_path" | "vote_average" | "id"
>;

export type MovieDetail = {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: {
    id: number;
    name: string;
  }[];
};
