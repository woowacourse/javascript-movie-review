import { fetchMovieInfo } from "./movieApi";
import Store from "./Store";

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.API_KEY

export const page = {
  page: 1,
  total_page: 2,
  last_keyword: "",

  showPopularMovies() {
    fetchMovieInfo(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=${page.page}`);
  },

  showSearchedMovies(keyword: string) {
    fetchMovieInfo(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&page=${page.page}&query=${keyword}`);
  },
};

export const resetMoviesAndPages = () => {
  Store.getInstance().initMovies();
  page.page = 1;
  page.total_page = 2;
};
