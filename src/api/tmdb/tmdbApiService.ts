import tmdbApiClient, {
  APIResponse,
  MovieResponse,
  MovieDetailResponse,
} from './tmdbApiClient';

export const getPopularMovies = (
  page: number = 1,
): Promise<APIResponse<MovieResponse>> => {
  const endpoint = '/movie/popular';
  const params = {
    page: page.toString(),
  };

  return tmdbApiClient.fetchData<APIResponse<MovieResponse>>(endpoint, params, {
    language: 'ko-KR',
  });
};

export const searchMovies = (
  query?: string,
  page: number = 1,
): Promise<APIResponse<MovieResponse>> => {
  const endpoint = '/search/movie';
  const params = {
    query: query || '',
    page: page.toString(),
  };

  return tmdbApiClient.fetchData<APIResponse<MovieResponse>>(endpoint, params, {
    language: 'ko-KR',
  });
};

export const getMovieDetail = (
  movieId: number,
  appendToResponse?: string,
): Promise<MovieDetailResponse> => {
  const endpoint = `/movie/${movieId}`;
  const params: Record<string, string> = {};

  if (appendToResponse) {
    params.append_to_response = appendToResponse;
  }

  return tmdbApiClient.fetchData<MovieDetailResponse>(endpoint, params, {
    language: 'ko-KR',
  });
};
