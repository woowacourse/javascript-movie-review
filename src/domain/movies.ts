import { removeMoreButton, renderMovieList } from "../components/MovieList/movieListHandler";
import { Movie } from "../type";
import { fetchMovies } from "./movieApi";
import Store from "./Store";

interface MovieResult {
  poster_path: string;
  title: string;
  vote_average: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.API_KEY;
const store: Store = Store.getInstance();

export const updateMovies = async (keyword?: string) => {
  const url = urlBuilder(keyword);
  const { results, total_pages } = await fetchMovies(url);
  store.setTotalPage(total_pages);
  store.appendMovies(convertApiResponseToMovieList(results));
  renderMovieList();
  if (store.getPage() === store.getTotalPage()) removeMoreButton();
}

const urlBuilder = (keyword?: string) => {
  return keyword ? (
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&page=${store.getPage()}&query=${keyword}`
  ) : (
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=${store.getPage()}`
  );
}

const convertApiResponseToMovieList = (results: MovieResult[]): Movie[] => {
  return results.map((movie) => {
    return {
      poster: movie.poster_path,
      title: movie.title,
      ratings: movie.vote_average,
    };
  });
};
