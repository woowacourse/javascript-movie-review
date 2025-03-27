export interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}
export interface MovieDetail {
  title: string;
  release_date: string;
  genres: Genre[];
  vote_average: number;
  overview: string;
  poster_path: string;
}
