import { Movie } from "../../../types/responseType/responseType";
import {
  appendMovies,
  appendSearchResults,
  currentPage,
  searchInputValue,
  setIsMoreError,
} from "../../store/store";
import { options, url } from "../config/config";

const useGetMoreMovieList = () => {
  const fetchMoreMovies = async (
    callback: (page: number) => Promise<Movie[] | null>
  ) => {
    const nextPage = currentPage + 1;

    if (searchInputValue.trim()) {
      try {
        const response = await fetch(url.more(nextPage), options);
        const data = await response.json();
        appendSearchResults(data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setIsMoreError(true);
      }
    } else {
      const newMovies = await callback(nextPage);
      if (newMovies) {
        appendMovies(newMovies);
      }
    }
  };
  return { fetchMoreMovies };
};

export default useGetMoreMovieList;
