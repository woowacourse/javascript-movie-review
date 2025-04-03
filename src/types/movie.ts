export interface Movie {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
}

export interface MovieDetail extends Movie {
  release_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  overview: string;
}
