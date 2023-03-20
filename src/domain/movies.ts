import { fetchMovieInfo } from "./movieApi";
import Store from "./Store";

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.API_KEY
const store: Store = Store.getInstance();

export const movies = {
  showPopularMovies() {
    fetchMovieInfo(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=${store.getPage()}`);
  },

  showSearchedMovies(keyword: string) {
    fetchMovieInfo(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&page=${store.getPage()}&query=${keyword}`);
  },
};
