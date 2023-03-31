export interface AppMovie {
  id: number;
  title: string;
  posterPath: string | null;
  rating: number;
}

export interface RatedMovie {
  id: number;
  score: string;
  desc: string;
}
