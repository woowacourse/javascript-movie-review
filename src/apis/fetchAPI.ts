import APIError from "../error/APIError";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_ACCESS_KEY;

const getHeaders = () => ({
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
});

export const fetchAPI = async (path: string, params = "") => {
  const url = `${BASE_URL}${path}?${params}&language=ko-KR`;
  const response = await fetch(url, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new APIError(response.status);
  }

  return response.json();
};
