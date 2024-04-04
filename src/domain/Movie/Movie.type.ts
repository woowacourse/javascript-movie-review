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

export interface fetchMoviesProps {
  movieType: string;
  page: number;
  onSuccess: (data: IMovie[]) => void;
  onError: (error: Error | unknown) => void;
}

export interface fetchMovieDetailProps {
  key: number;
  onSuccess: (data: IMovieDetail) => void;
  onError: (error: Error | unknown) => void;
}
