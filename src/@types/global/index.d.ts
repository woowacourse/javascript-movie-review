declare module "*.png" {
  const value: string;
  export default value;
}

type movieList = movieInfo[];

type listState = keyof LIST_STATE;

type myRating = { movieId: Number; score: Number }[];

type toggleSkeleton = keyof TOGGLE_SKELETON;

type appState = {
  page: number;
  listState: listState;
  movieList: movieList;
  movieName: string;
};

type movieInfo = {
  title: string;
  poster: string;
  rating: string;
  movieId: string;
};

type movieListResponse = {
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

type movieDetailResponse = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};
