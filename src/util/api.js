import { apiKey } from "../../apiKey.js";

export const popularUrl = (page) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}`;
};

export const searchUrl = (query, page) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${query}&page=${page}`;
};

export const modalUrl = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;
};

export const request = async (url) => {
  const data = await fetch(url).then((res) => {
    return res.json();
  });

  return data;
};
