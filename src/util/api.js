import { apiKey } from "../../apiKey.js";

export const popularUrl = (page) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
};

export const searchUrl = (query, page) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${query}&page=${page}`;
};

export const request = async (url) => {
  const data = await fetch(url).then((res) => {
    if (res.status === 401) {
      return alert("접근 권한이 없습니다.");
    }

    if (res.status === 404) {
      return alert("없는 페이지입니다.");
    }

    if (!res.ok) {
      return alert("알수 없는 에러가 발생했습니다.");
    }

    return res.json();
  });

  return data;
};
