import { removeMoreButton } from "../components/MovieList/movieListHandler";
import { Movie } from "../type";
import { movieStore } from "./movieStore";
import { page } from "./page";

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

export const fetchMovieInfo = async (url: string) => {
  try {
    const response = await fetch(url).then((data) => data.json());
    if (page.page === response.page) {
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
  page.total_page = total_pages;

  saveMoviesAndRemoveMoreButton(results);
};

const saveMoviesAndRemoveMoreButton = (results: MovieResult[]) => {
  movieStore.appendMovies(convertApiResponseToMovieList(results));

  if (page.page === page.total_page) removeMoreButton();
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

export const resetMoviesAndPages = () => {
  movieStore.movies = [];
  page.page = 1;
  page.total_page = 2;
};
