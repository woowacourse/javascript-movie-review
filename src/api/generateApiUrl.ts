import { API_BASE_URL } from '../constants';

type QueryParams = Record<string, string | number | boolean>;

function generateApiUrl(endpoint: string, queryParams: QueryParams): string {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${API_BASE_URL}${endpoint}?${queryString}`;
}

export { generateApiUrl };
