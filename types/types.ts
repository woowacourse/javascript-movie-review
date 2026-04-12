export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
}

export interface MovieDetail extends Movie {
  overview: string;
  genres: {id: number, name : string}[];
  release_date : string;
}
