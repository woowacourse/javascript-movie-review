export interface MovieResponse {
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;
}

export interface MovieInterface extends Pick<MovieResponse, 'title' | 'id'> {
  image: string;
  score: number;
}
