export const API_KEY = process.env.API_KEY;

export const FetchUrl: Readonly<{ [key: string]: string }> = {
  POPULAR_URL: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=`,
  SEARCH_URL: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=`,
};

export const ConstantsNumber: Readonly<{ [key: string]: number }> = {
  PAGE_MIN_NUMBER: 1,
  PAGE_MAX_NUMBER: 50,
  ROAD_IMAGE_NUMBER: 20,
};

export const StatusCode: Readonly<{ [key: number]: number }> = {
  401: 34,
  402: 7,
  403: 3,
  404: 34,
  500: 25,
};
