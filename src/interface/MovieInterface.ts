import Movie from '../domain/Movie';

export interface MovieData {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}

export interface MovieDetailData extends MovieData {
  genres: string[];
  overview: string;
  userScore: number | null;
}

export interface MovieList {
  movieList: MovieData[];
}

export interface MovieListData {
  total_pages: number;
  results: {
    id: number;
    title: string;
    genre_ids: number[];
    poster_path: string;
    vote_average: number;
    overview: string;
  }[];
}

export interface MoviePageDataParams extends MovieListData {
  pageNumber: number;
}

export interface MoviePageData {
  movieList: Movie[];
  hasNextPage: boolean;
}
