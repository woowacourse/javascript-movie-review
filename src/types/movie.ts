interface MovieData {
  page: number;
  results: MovieDataResult[];
  totalPages: number;
  totalResults: number;
}

interface MovieDataResult {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

interface Movie {
  id: number;
  title: string;
  voteAverage: number;
  posterPath: string;
}

type MovieFetchFunction = () => Promise<MovieDataResult[]>;

export { MovieData, MovieDataResult, Movie, MovieFetchFunction };
