export interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  genres?: [];
  overview?: string;
}

export type ViewType = 'popular' | 'search';
