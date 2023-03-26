export interface CoreInfoType {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}

export interface genres {
  id: number;
  name: string;
}

export interface DetailInfoType extends CoreInfoType {
  genres: genres[];
  overview: string;
}

export interface TotalMovieInfoType {
  audult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
