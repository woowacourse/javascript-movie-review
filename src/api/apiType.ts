interface CommonType {
  movieId: number;
  movieTitle: string;
  voteAverage: number;
  posterPath: string;
}

export interface MovieDataType extends CommonType {
  voteCount: number;
  popularity: number;
  releaseDate: string;
}

type GenresType = { id: number; name: string }[];

export interface MovieDetailDataType extends CommonType {
  genres: GenresType;
  overview: string;
}
