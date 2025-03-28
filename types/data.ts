export interface TotalData {
  readonly page: number;
  readonly results: MovieData[];
  readonly total_pages: number;
  readonly total_results: number;
}

export interface MovieData {
  readonly adult: boolean;
  readonly backdrop_path: null | string;
  readonly genre_ids: number[];
  readonly id: number;
  readonly original_language: string;
  readonly original_title: string;
  readonly overview: string;
  readonly popularity: number;
  readonly poster_path: string;
  readonly release_date: Date;
  readonly title: string;
  readonly video: boolean;
  readonly vote_average: number;
  readonly vote_count: number;
}

export interface MovieDetailsData {
  readonly adult: boolean;
  readonly backdrop_path: string;
  readonly belongs_to_collection: BelongsToCollectionData;
  readonly budget: number;
  readonly genres: GenreData[];
  readonly homepage: string;
  readonly id: number;
  readonly imdb_id: string;
  readonly origin_country: string[];
  readonly original_language: string;
  readonly original_title: string;
  readonly overview: string;
  readonly popularity: number;
  readonly poster_path: string;
  readonly production_companies: ProductionCompanyData[];
  readonly production_countries: ProductionCountryData[];
  readonly release_date: Date;
  readonly revenue: number;
  readonly runtime: number;
  readonly spoken_languages: SpokenLanguageData[];
  readonly status: string;
  readonly tagline: string;
  readonly title: string;
  readonly video: boolean;
  readonly vote_average: number;
  readonly vote_count: number;
}

export interface BelongsToCollectionData {
  readonly id: number;
  readonly name: string;
  readonly poster_path: string;
  readonly backdrop_path: string;
}

export interface GenreData {
  readonly id: number;
  readonly name: string;
}

export interface ProductionCompanyData {
  readonly id: number;
  readonly logo_path: string;
  readonly name: string;
  readonly origin_country: string;
}

export interface ProductionCountryData {
  readonly iso_3166_1: string;
  readonly name: string;
}

export interface SpokenLanguageData {
  readonly english_name: string;
  readonly iso_639_1: string;
  readonly name: string;
}

export interface UserMovieRateData {
  readonly id: number;
  readonly rate: number;
}
