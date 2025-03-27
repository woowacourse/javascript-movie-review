import { MovieDetailResponse } from "../../api/tmdbApi";

export interface MovieDetailDTO {
  id: number;
  title: string;
  originalTitle: string;
  posterPath: string | null;
  backdropPath: string | null;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  imdbId: string | null;
  originalLanguage: string;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;
  video: boolean;
  belongsToCollection: any | null;
  productionCompanies: { 
    id: number; 
    logoPath: string | null; 
    name: string; 
    originCountry: string 
  }[];
  productionCountries: {
    iso31661: string;
    name: string;
  }[];
  spokenLanguages: {
    englishName: string;
    iso6391: string;
    name: string;
  }[];
}

export default class MovieDetail {
  id: number;
  title: string;
  originalTitle: string;
  posterPath: string | null;
  backdropPath: string | null;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  imdbId: string | null;
  originalLanguage: string;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;
  video: boolean;
  belongsToCollection: any | null;
  productionCompanies: { 
    id: number; 
    logoPath: string | null; 
    name: string; 
    originCountry: string 
  }[];
  productionCountries: {
    iso31661: string;
    name: string;
  }[];
  spokenLanguages: {
    englishName: string;
    iso6391: string;
    name: string;
  }[];

  constructor(data: MovieDetailDTO) {
    this.id = data.id;
    this.title = data.title;
    this.originalTitle = data.originalTitle;
    this.posterPath = data.posterPath;
    this.backdropPath = data.backdropPath;
    this.overview = data.overview;
    this.releaseDate = data.releaseDate;
    this.voteAverage = data.voteAverage;
    this.voteCount = data.voteCount;
    this.popularity = data.popularity;
    this.adult = data.adult;
    this.budget = data.budget;
    this.genres = data.genres;
    this.homepage = data.homepage;
    this.imdbId = data.imdbId;
    this.originalLanguage = data.originalLanguage;
    this.revenue = data.revenue;
    this.runtime = data.runtime;
    this.status = data.status;
    this.tagline = data.tagline;
    this.video = data.video;
    this.belongsToCollection = data.belongsToCollection;
    this.productionCompanies = data.productionCompanies;
    this.productionCountries = data.productionCountries;
    this.spokenLanguages = data.spokenLanguages;
  }

  static fromResponse(response: MovieDetailResponse): MovieDetail {
    return new MovieDetail({
      id: response.id,
      title: response.title,
      originalTitle: response.original_title,
      posterPath: response.poster_path,
      backdropPath: response.backdrop_path,
      overview: response.overview,
      releaseDate: response.release_date,
      voteAverage: response.vote_average,
      voteCount: response.vote_count,
      popularity: response.popularity,
      adult: response.adult,
      budget: response.budget,
      genres: response.genres,
      homepage: response.homepage,
      imdbId: response.imdb_id,
      originalLanguage: response.original_language,
      revenue: response.revenue,
      runtime: response.runtime,
      status: response.status,
      tagline: response.tagline,
      video: response.video,
      belongsToCollection: response.belongs_to_collection,
      productionCompanies: response.production_companies.map(company => ({
        id: company.id,
        logoPath: company.logo_path,
        name: company.name,
        originCountry: company.origin_country
      })),
      productionCountries: response.production_countries.map(country => ({
        iso31661: country.iso_3166_1,
        name: country.name
      })),
      spokenLanguages: response.spoken_languages.map(language => ({
        englishName: language.english_name,
        iso6391: language.iso_639_1,
        name: language.name
      }))
    });
  }

  getPosterUrl(): string {
    if (!this.posterPath) {
      return './images/nullImage.png';
    }
    return `https://image.tmdb.org/t/p/w500/${this.posterPath}`;
  }

  getBackdropUrl(): string {
    if (!this.backdropPath) {
      return './images/nullBackground.png';
    }
    return `https://image.tmdb.org/t/p/original/${this.backdropPath}`;
  }

  getFormattedReleaseDate(): string {
    if (!this.releaseDate) {
      return '개봉일 정보 없음';
    }
    const date = new Date(this.releaseDate);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getFormattedRuntime(): string {
    if (!this.runtime) {
      return '상영 시간 정보 없음';
    }
    const hours = Math.floor(this.runtime / 60);
    const minutes = this.runtime % 60;
    return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
  }

  getGenresText(): string {
    if (!this.genres || this.genres.length === 0) {
      return '장르 정보 없음';
    }
    return this.genres.map(genre => genre.name).join(', ');
  }
}