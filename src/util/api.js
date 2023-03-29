import { apiKey } from "../../apiKey.js";

export const popularUrl = (page) => {
  const url = new URLSearchParams(`api_key=${apiKey}&language=ko-KR`);
  url.set("page", `${page}`);
  return `https://api.themoviedb.org/3/movie/popular?${url.toString()}`;
};

export const searchUrl = (query, page) => {
  const url = new URLSearchParams(`api_key=${apiKey}&language=ko-KR`);
  url.set("page", `${page}`);
  url.set("query", `${query}`);
  return `https://api.themoviedb.org/3/search/movie?${url.toString()}`;
};

export const modalUrl = (id) => {
  const url = new URLSearchParams(`api_key=${apiKey}&language=ko-KR`);
  return `https://api.themoviedb.org/3/movie/${id}?${url.toString()}`;
};

export const request = async (url) => {
  const data = await fetch(url).then((res) => {
    return res.json();
  });

  return data;
};
