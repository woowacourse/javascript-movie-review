export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
}

export type MovieResponse = {
  results: Movie[];
  total_pages: number;
};

export type MovieDetailResponse = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  genres: [{ name: string }];
  release_date: string;
};
