interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

interface MovieDetail extends Movie {
  genres: [{ id: number; name: string }];
  overview: string;
}

interface MovieDataType {
  page: number;
  results: Movie[];
  total_pages: number;
  total_result: number;
}

interface Star {
  id: number;
  count: number;
}

export { Movie, MovieDetail, MovieDataType, Star };
