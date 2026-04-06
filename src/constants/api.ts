const token = import.meta.env.VITE_API_TOKEN;

export const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};
export const THUMBNAIL_IMAGE = "https://media.themoviedb.org/t/p/w200";
export const BANNER_IMAGE_URL = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";
export const API_COMMON_URL = "https://api.themoviedb.org/3";

export const API_URL = {
  popular: (page: number) => `/movie/popular?language=ko-KR&page=${page}`,
  search: (query: string, page: number) => `/search/movie?language=ko-KR&query=${encodeURIComponent(query)}&page=${page}`,
}