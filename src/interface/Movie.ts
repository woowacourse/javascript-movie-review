export interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: string;
  genres?: [];
  overview?: string;
}

export type ViewType = 'popular' | 'search';
