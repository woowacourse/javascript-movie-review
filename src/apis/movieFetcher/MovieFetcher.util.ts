import MovieFetcher from './MovieFetcher';

export const isMovieErrorStatusCode = (status: number): status is keyof typeof MovieFetcher.ERROR_MESSAGES_MAP => {
  return status in MovieFetcher.ERROR_MESSAGES_MAP;
};

export const getAPIEndpoint = (type: string, id?: string) => {
  switch (type) {
    case 'popular':
      return `${process.env.BASE_URL}/movie/popular`;
    case 'detail':
      return `${process.env.BASE_URL}/movie/${id}`;
    default:
      return `${process.env.BASE_URL}/search/movie`;
  }
};

export const createMovieQueryString = (options?: Record<string, string>) => {
  const params = new URLSearchParams({
    api_key: process.env.API_KEY,
    language: 'ko',
  });

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      params.append(key, value);
    });
  }

  return params.toString();
};
