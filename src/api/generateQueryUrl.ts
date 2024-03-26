import { QueryUrl } from '../interface/api';

function generateQueryUrl({ baseUrl, endpoint, query }: QueryUrl) {
  const queryString = Object.entries(query).map(([key, value]) => [key, value.toString()]);
  const queryParams = new URLSearchParams(queryString);
  return `${baseUrl}${endpoint}?${queryParams.toString()}`;
}

export default generateQueryUrl;
