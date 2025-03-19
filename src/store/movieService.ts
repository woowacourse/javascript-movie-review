import { Movie } from "../../types/movie";
import { popularApiUrl } from "../api/config";
import { mapToMovie } from "../utils/mapper";

const moviesState = {
  list: [] as Movie[],
  currentPage: 1,
};

const fetchMovies = async (page = 1) => {
  try {
    const response = await fetch(`${popularApiUrl}&page=${page}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    moviesState.list = data.results.map((item: any) => mapToMovie(item));
    moviesState.currentPage = page;

    console.log(moviesState.list);

    return moviesState.list;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export { moviesState, fetchMovies };
