export enum IMAGE_URL {
  BASE = 'https://image.tmdb.org/t/p/original',
  ALTERNATIVE = './assets/no_image.png',
}

export const API_URL = {
  POPULAR_MOVIES: (currentPage: number) => {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${currentPage}&include_adult=false`;
  },
  SEARCH_MOVIES: (currentPage: number, keyword: string) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${keyword}&page=${currentPage}&include_adult=false`;
  },
};
