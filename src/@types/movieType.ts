export interface CoreInfoType {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}

export interface Genres {
  id: number;
  name: string;
}

export interface DetailInfoType extends CoreInfoType {
  genres: string[];
  overview: string;
}

export interface TotalMovieInfoType {
  audult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: Genres[];
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

export interface MovieItemListType {
  render: () => void;
  addMovies: (movieInfos: string, totalPages: number, currentPage: number) => void;
}