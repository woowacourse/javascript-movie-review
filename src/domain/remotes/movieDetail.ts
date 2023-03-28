import { QUERY_PARAMS } from './constants';
import { request } from './index';

interface MovieDetailResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: any;
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

export interface MovieDetail {
  id: MovieDetailResponse['id'];
  title: MovieDetailResponse['title'];
  genres: MovieDetailResponse['genres'];
  overview: MovieDetailResponse['overview'];
  posterPath: MovieDetailResponse['poster_path'];
  voteAverage: MovieDetailResponse['vote_average'];
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path?: string;
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
}

export const fetchMovieDetail = async (id: number): Promise<MovieDetail> => {
  const response = await request<MovieDetailResponse>(`movie/${id}`, QUERY_PARAMS);

  return createMovieDetail(response);
};

const createMovieDetail = (movieDetailResponse: MovieDetailResponse): MovieDetail => {
  if (isInvalidMovieDetailResponse(movieDetailResponse)) {
    throw new Error('유효하지 않은 데이터입니다.');
  }

  const { id, title, genres, overview, poster_path, vote_average } = movieDetailResponse;

  return {
    id,
    title,
    genres,
    overview,
    posterPath: poster_path,
    voteAverage: vote_average,
  };
};

const isInvalidMovieDetailResponse = (movieDetailResponse: MovieDetailResponse) => {
  const { id, title, genres, overview, poster_path, vote_average } = movieDetailResponse;

  return (
    typeof id !== 'number' ||
    typeof title !== 'string' ||
    !Array.isArray(genres) ||
    typeof overview !== 'string' ||
    typeof poster_path !== 'string' ||
    typeof vote_average !== 'number'
  );
};
