import { apiKey } from "../../apiKey.js";

export const popularUrl = (page) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
};

export const searchUrl = (query, page) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${query}&page=${page}`;
};

export const request = async (url) => {
  try {
    const data = await fetch(url).then((res) => res.json());
    return data;
  } catch (e) {
    console.log(e);
  }
};
