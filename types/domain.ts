export interface IPage {
  readonly page: number;
  readonly results: IMovie[];
  readonly total_pages: number;
  readonly total_results: number;
}

export interface IMovie {
  readonly adult: boolean;
  readonly backdrop_path: null | string;
  readonly genre_ids: number[];
  readonly id: number;
  readonly original_language: string;
  readonly original_title: string;
  readonly overview: string;
  readonly popularity: number;
  readonly poster_path: string;
  readonly release_date: Date;
  readonly title: string;
  readonly video: boolean;
  readonly vote_average: number;
  readonly vote_count: number;
}
