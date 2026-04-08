export interface Movie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genres: [{ name: string }];
}

export type State = {
  pageNum: number;
  searchBarText: string;
  movieList: Movie[];
  userRating: Record<number, number>;
};
