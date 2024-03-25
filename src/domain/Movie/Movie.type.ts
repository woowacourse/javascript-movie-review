interface Genre {
  id: number;
  name: string;
}

export interface IMovie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

export interface IMovieDetail extends IMovie {
  genres: Genre[];
  overview: string;
}
