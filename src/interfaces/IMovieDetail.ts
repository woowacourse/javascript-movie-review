interface IMovieDetail {
  adult: boolean;
  backdrop_path: any;
  belongs_to_collection: any;
  budget: number;
  genres: any[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: any;
  production_companies: any[];
  production_countries: any[];
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

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export { IMovieDetail };
