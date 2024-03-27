import { QueryUrl } from '../interface/api';

function generateQueryUrl({ baseUrl, endpoint, query }: QueryUrl) {
  const queryString = Object.entries(query)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => [key, value.toString()]);
  const queryParams = new URLSearchParams(queryString);
  return `${baseUrl}${endpoint}?${queryParams.toString()}`;
}

export default generateQueryUrl;
