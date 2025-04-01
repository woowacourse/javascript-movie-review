export interface MovieInfo extends MovieContent {
  release_date: string;
  genres: Genre[];
  backdrop_path: string;
  overview: string;
}
export interface MovieContent {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface HeaderContent extends MovieContent {
  backdrop_path: string;
  overview: string;
}
export interface ModalContent extends Omit<MovieInfo, "backdrop_path"> {}

type Genre = {
  id: number;
  name: string;
};
