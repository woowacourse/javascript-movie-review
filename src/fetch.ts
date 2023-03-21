import { FetchUrl } from "./utils/constants";

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result;
    }
    if (response.text) {
      const message = await response.text();
      throw new Error(message);
    }
  } catch (error) {
    throw error;
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
