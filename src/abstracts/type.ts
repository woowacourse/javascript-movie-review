export type MovieItem = {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export type MovieElementData = Pick<
  MovieItem,
  "poster_path" | "id" | "title" | "vote_average"
>;

export interface MovieDetails {
  id: number;
  genres: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
}

export type GenreType = {
  id: number;
  name: string;
};

export type listAPIReturnType = {
  isSuccess: boolean;
  data: Object;
};
