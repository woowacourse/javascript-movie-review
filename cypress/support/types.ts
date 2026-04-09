export type MockMovie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
};

export type MockMovieDetail = MockMovie & {
  overview: string;
  release_date: string;
  genres: { name: string }[];
};
