export interface MovieDetail {
  id: number;
  title: string;
  poster_path: string;
  vote_average?: number;
  overview: string;
  release_date: string;
  genres: { id: number; name: string }[];
}
