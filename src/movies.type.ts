export type Movie = {
  title: string;
  id: number;
  overview: string;
  vote_average: number;
  poster_path: string;
  genre_ids: Array<number>;
};

export type Genre = {
  id: number;
  name: string;
};
