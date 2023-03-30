declare module "*.png" {
  const value: string;
  export default value;
}

type MovieList = MovieInfo[];

type ListState = keyof LIST_STATE;

type MyRating = { movieId: number; myRating: Score }[];

type Score = 0 | 2 | 4 | 6 | 8 | 10;

type ToggleSkeleton = keyof TOGGLE_SKELETON;

type RatingBoxState = { myRating: Score };

interface AppState {
  page: number;
  listState: ListState;
  movieList: MovieList;
  movieName: string;
}

interface MovieModalState {
  poster: string;
  rating: number;
  overview: string;
  comment: string;
  genre: string;
}

interface MovieInfo {
  title: string;
  poster: string;
  rating: string;
  movieId: number;
}

interface MovieListResponse {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

interface MovieData {
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
}

interface MovieDetailResponse {
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
}
