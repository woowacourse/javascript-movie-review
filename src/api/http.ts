import { popularApiUrl } from "./config";

const bearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;

type Options = {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  };
};

const defaultOptions: Options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
};

export const fetchMovies = (apiUrl: string = popularApiUrl) => {
  return fetch(apiUrl, defaultOptions)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      alert("영화 정보를 가져오는 중 오류가 발생했습니다.");
      throw error;
    });
};

export default fetchMovies;
