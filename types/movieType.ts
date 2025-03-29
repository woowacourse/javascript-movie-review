export interface MovieInfo {
  id?: number;
  title: string;
  release_date: string;
  genres: Genre[];
  poster_path: string;
  backdrop_path?: string;
  overview: string;
  vote_average: number;
}

type Genre = {
  id: number;
  name: string;
};
