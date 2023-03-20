import { API_BASE_URL } from '../constants';

type QueryParams = Record<string, string | number | boolean>;

function generateUrl(endpoint: string, queryParams: QueryParams): string {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${API_BASE_URL}${endpoint}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&${queryString}`;
}

export { generateUrl };
