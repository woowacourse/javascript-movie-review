export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export type ViewType = 'popular' | 'search';
