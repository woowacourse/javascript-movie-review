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

interface MoviesApiResponse {
  page: number;
  results: MovieApiResponse[];
  total_pages: number;
  total_results: number;
}

// 내부 도메인 모델
export interface Movie {
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

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export class MovieDTO {
  static from(data: MovieApiResponse): Movie {
    return {
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
