export interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: string;
  genres?: [];
  overview?: string;
  userVote?: number;
}

export type ViewType = 'popular' | 'search';
