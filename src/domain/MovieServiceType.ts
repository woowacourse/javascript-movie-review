// TODO: 오류를 임시로 null로 해두었음
export interface MovieServiceType {
  fetchPopularMovieList: (currentPage: number) => Promise<{ hasNextPage: boolean; movieList: MovieData[] } | null>;
  fetchSearchResult: ({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) => Promise<{ hasNextPage: boolean; movieList: MovieData[] } | null>;
  fetchMovieDetail: (movieId: number) => Promise<MovieDetail | null>;
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
  genres: Array<string>;
  title: string;
  voteAverage: number;
  description: string;
  posterPath: string;
}
