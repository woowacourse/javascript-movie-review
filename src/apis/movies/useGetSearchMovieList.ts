import { Movie } from "../../../types/responseType/responseType";
import {
  resetPage,
  setIsSearchError,
  setSearchResults,
  setTotalResults,
} from "../../store/store";
import { options, url } from "../config/config";

const useGetSearchMovieList = () => {
  const fetchSearchMovieList = async (
    query: string
  ): Promise<Movie[] | null> => {
    const searchUrl = url.search(query);
    try {
      const response = await fetch(searchUrl, options);
      const data = await response.json();
      const results = data.results || [];

      setTotalResults(data.total_results);
      setSearchResults(results);
      resetPage();
      return results;
    } catch (error) {
      setIsSearchError(true);
      console.error("Error fetching data:", error);
    }
    return null;
  };

  return { fetchSearchMovieList };
};

export default useGetSearchMovieList;
