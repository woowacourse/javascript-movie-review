export interface Movie {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
  overview?: string;
  genre_ids?: number[];
}

export type MovieDetail = {
  poster_path: string;
  title: string;
  genres: { id: number; name: string }[];
  vote_average: number;
  overview: string;
  id: number;
};
