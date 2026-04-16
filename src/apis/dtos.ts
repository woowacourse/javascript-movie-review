import noImagePlanetImg from "../images/no_image_planet.png";

// 외부 API 응답 타입
interface MovieApiResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieDetailApiResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MoviesApiResponse {
  page: number;
  results: MovieApiResponse[];
  total_pages: number;
  total_results: number;
}

// 내부 도메인 모델
export interface Movie {
  id: number;
  title: string;
  rating: number;
  voteAverage: number;
  posterPath: string;
}

export interface MoviesResponse {
  page: number;
  movies: Movie[];
  totalPages: number;
}

export interface MovieDetail {
  id: number;
  title: string;
  voteAverage: number;
  posterPath: string;
  genres: string[];
  releaseYear: string;
  overview: string;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export class MovieDTO {
  static from(data: MovieApiResponse): Movie {
    return {
      id: data.id,
      title: data.title,
      rating: data.vote_average,
      posterPath: data.poster_path
        ? `${IMAGE_BASE_URL}/${data.poster_path}`
        : noImagePlanetImg,
      voteAverage: data.vote_average,
    };
  }
}

export class MoviesResponseDTO {
  static from(data: MoviesApiResponse): MoviesResponse {
    return {
      page: data.page,
      movies: data.results.map(MovieDTO.from),
      totalPages: data.total_pages,
    };
  }
}

export class MovieDetailDTO {
  static from(data: MovieDetailApiResponse): MovieDetail {
    return {
      id: data.id,
      title: data.title,
      posterPath: data.poster_path
        ? `${IMAGE_BASE_URL}/${data.poster_path}`
        : noImagePlanetImg,
      voteAverage: data.vote_average,
      genres: data.genres.map((g) => g.name),
      releaseYear: data.release_date.slice(0, 4),
      overview: data.overview,
    };
  }
}
