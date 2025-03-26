export interface Movie {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
  overview?: string;
  genre_ids?: number[];
}
