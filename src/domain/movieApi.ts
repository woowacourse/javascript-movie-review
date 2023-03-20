import { removeMoreButton } from "../components/MovieList/movieListHandler";
import { Movie } from "../type";
import Store from "./Store";

interface MovieResult {
  poster_path: string;
  title: string;
  vote_average: number;
}

interface MovieApiResponse {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

const store: Store = Store.getInstance();

export const fetchMovieInfo = async (url: string) => {
  try {
    const response = await fetch(url).then((data) => data.json());
    if (store.getPage() === response.page) {
      handleMovieInfoResponse(response);
    }
    else {
      throw new Error(response.status_message);
    }

  } catch (error) {
    if (error instanceof Error) return alert(error.message);
  }
};

export const handleMovieInfoResponse = async (response: MovieApiResponse) => {
  const { results, total_pages } = await response;
  store.setTotalPage(total_pages);

  saveMoviesAndRemoveMoreButton(results);
};

const saveMoviesAndRemoveMoreButton = (results: MovieResult[]) => {
  store.appendMovies(convertApiResponseToMovieList(results));
  if (store.getPage() === store.getTotalPage()) removeMoreButton();
};

const convertApiResponseToMovieList = (results: MovieResult[]): Movie[] => {
  return results.map((movie) => {
    return {
      poster: movie.poster_path,
      title: movie.title,
      ratings: movie.vote_average,
    };
  });
};

