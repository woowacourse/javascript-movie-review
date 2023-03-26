import { USER_SCORES } from '../constants/ui';

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
  userVote: UserScores;
  overview: string;
  posterPath: string;
}

type MovieFetchFunction = () => Promise<MovieDataResult[]>;

type UserScores = (typeof USER_SCORES)[number];

interface MovieGenreData {
  genres: MovieGenre[];
}

interface MovieGenre {
  id: number;
  name: string;
}

interface MovieLoadedEventData {
  movies: Movie[];
  searchQuery: string;
}

interface MovieResetEventData {
  searchQuery: string;
}

interface MovieErrorEventData {
  error: Error;
}

interface MovieRetrievedEventData {
  movie: Movie;
  searchQuery: string;
  isBackButton: boolean;
}

interface MovieUserVoteUpdateEventData {
  userVote: UserScores;
}

export {
  MovieData,
  MovieDataResult,
  Movie,
  MovieFetchFunction,
  MovieGenreData,
  MovieGenre,
  UserScores,
  MovieLoadedEventData,
  MovieResetEventData,
  MovieErrorEventData,
  MovieRetrievedEventData,
  MovieUserVoteUpdateEventData,
};
