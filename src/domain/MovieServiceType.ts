export interface MovieServiceType {
  fetchPopularMovieList: (pageNumber: number) => Array<MovieData>;
  fetchSearchResult: ({ query, pageNumber }: { query: string; pageNumber: number }) => Array<MovieData>;
  fetchMovieDetail: (movieId: number) => MovieDetail;
}

// 가공 타입
export interface MovieData {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}

export interface MovieDetail {
  id: number;
  genres: { name: string; id: number };
  title: string;
  voteAverage: number;
  description: string;
  posterPath: string;
}
