declare module "*.png" {
  const value: string;
  export default value;
}

type movieList = movieInfo[];

interface appState {
  page: number;
  listState: "popular" | "searched";
  movieList: movieList;
  movieName: string;
}

interface movieInfo {
  title: string;
  poster: string;
  rating: string;
  movieId: string;
}

type parsedJson = {
  page: number;
  results: movieData[];
  total_pages: number;
  total_results: number;
};

type movieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: "ko";
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
