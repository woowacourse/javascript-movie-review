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
  genres: string[];
  releaseDate: string;
  voteAverage: number;
  userVote: number;
  overview: string;
  posterPath: string;
}

type MovieFetchFunction = () => Promise<MovieDataResult[]>;

interface MovieGenreData {
  genres: MovieGenre[];
}

interface MovieGenre {
  id: number;
  name: string;
}

export { MovieData, MovieDataResult, Movie, MovieFetchFunction, MovieGenreData, MovieGenre };
