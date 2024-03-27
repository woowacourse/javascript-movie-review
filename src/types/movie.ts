export interface MovieType {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

export type MovieListType = MovieType[];

export interface MovieDataType {
  movieList: MovieListType;
  isLastPage: boolean;
}

interface genreType {
  id: number;
  name: string;
}

export interface MovieDetailType extends MovieType {
  genres: genreType[];
  overview: string;
}
