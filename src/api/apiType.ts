interface CommonMovieData {
  movieId: number;
  movieTitle: string;
  voteAverage: number;
  posterPath: string;
}

export interface MovieData extends CommonMovieData {
  voteCount: number;
  popularity: number;
  releaseDate: string;
}

type GenresType = { id: number; name: string }[];

export interface MovieDetailData extends CommonMovieData {
  genres: GenresType;
  overview: string;
}
