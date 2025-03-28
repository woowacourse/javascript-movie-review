declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.css';

interface MovieData {
  id: number;
  imgUrl: string;
  score: number;
  title: string;
  overview: string;
}

interface MovieDetailData {
  id: number;
  imgUrl: string;
  score: number;
  title: string;
  genres: string;
  overview: string;
}

interface MovieItem {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string | null;
  genres: number[];
  original_language: string;
  vote_average: number;
  vote_count: number;
  video: boolean;
  adult: boolean;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
