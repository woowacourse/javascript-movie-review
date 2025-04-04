import { Genre } from "../src/apis/apiTypes";

export interface MovieSummary {
  backdrop_path?: string;
  title: string;
  vote_average: number;
  id: number;
}

export interface MovieDetailInfo {
  backdrop_path: string;
  genres: Genre[];
  id: number;
  overview: string;
  release_date: string;
  title: string;
  vote_average: number;
}
