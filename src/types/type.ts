export interface Movie {
  poster_path: string;
  title: string;
  vote_average: number;
  popularity: number;
}

export type CustomEvent = {
  eventType: string;
  data?: string | null;
};
