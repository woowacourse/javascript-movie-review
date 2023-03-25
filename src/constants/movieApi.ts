export const requestUrl = Object.freeze({
  getPopularMovie: (page: number) => {
    return `https://ornate-swan-ce5a5e.netlify.app/tmdb/movie/popular?language=ko-KR&page=${page}`;
  },
  getSearchMovie: (query: FormDataEntryValue, page: number) => {
    return `https://ornate-swan-ce5a5e.netlify.app/tmdb/search/movie?language=ko-KR&query=${query}&page=${page}`;
  },
  getMovieDetail: (id: string) => {
    return `https://ornate-swan-ce5a5e.netlify.app/tmdb/movie/${id}?language=ko-KR`;
  },
});
