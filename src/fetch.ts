import { FetchUrl } from "./utils/constants";

export const mostPopular = async (pageNumber: number) => {
  const response = await fetch(`${FetchUrl.POPULAR_URL}${pageNumber}`);

  if (response.ok) {
    const result = await response.json();

    return result;
  }
  return null;
};

export const search = async (query: string, pageNumber: number) => {
  const response = await fetch(
    `${FetchUrl.SEARCH_URL}${query}&page=${pageNumber}&include_adult=false`
  );

  if (response.ok) {
    const result = await response.json();

    return result;
  }
  return null;
};
