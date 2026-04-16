export interface MovieDetail {
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
