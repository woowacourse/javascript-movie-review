export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export type MovieAPIResponse = [Movie[], number, number];

export interface UrlParams extends URLSearchParams {
  api_key?: string;
  language: string;
  page: string;
  query?: string;
}
