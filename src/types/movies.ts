export interface FetchResponse<T> {
  results: T;
}

export interface MovieItem {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
}
