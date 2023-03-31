export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
  overview: string;
  genreIDs: number[];
}

export interface GenreList {
  [id: number]: string;
}

export interface UserScoreList {
  [id: number]: number;
}
