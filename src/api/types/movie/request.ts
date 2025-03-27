export interface MovieApiRequest {
  page: number;
  title?: string;
  language?: string;
  include_adult?: boolean;
}

export type GetMoviesRequest = Omit<MovieApiRequest, "title">;
export type SearchMoviesRequest = Required<
  Pick<MovieApiRequest, "page" | "title">
>;
