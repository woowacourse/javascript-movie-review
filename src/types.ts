export interface Movie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  vote_average: number;
}

export type State = {
  pageNum: number;
  searchBarText: string;
  movieList: Movie[];
};
