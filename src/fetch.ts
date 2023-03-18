import { FetchUrl } from "./utils/constants";

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    return null;
  }
};

export const mostPopular = async (pageNumber: number) => {
  const url = `${FetchUrl.POPULAR_URL}${pageNumber}`;
  return await fetchData(url);
};

export const search = async (query: string, pageNumber: number) => {
  const url = `${FetchUrl.SEARCH_URL}${query}&page=${pageNumber}&include_adult=false`;
  return await fetchData(url);
};
