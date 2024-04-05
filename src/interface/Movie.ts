export interface ResponseMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number | null;
}

export interface ResponseDetailMovie extends ResponseMovie {
  genres: [] | null;
  overview: string | null;
}

export interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: string;
}

export interface DetailMovie extends Movie {
  genres: [] | null;
  overview: string | null;
}

export interface StorageMovie extends Movie {
  genres: [] | null;
  overview: string | null;
  userVote: number;
}

export type ViewType = 'popular' | 'search';
