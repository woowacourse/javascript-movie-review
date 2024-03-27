export interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
}

export type ViewType = 'popular' | 'search';
