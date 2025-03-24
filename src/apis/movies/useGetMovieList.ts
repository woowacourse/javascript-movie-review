import {
  Movie,
  MovieListResponse,
} from "../../../types/responseType/responseType";
import { setIsError, setIsLoading, setTotalResults } from "../../store/store";
import { options, url } from "../config/config";

const useGetMovieList = () => {
  const fetchMovies = async (page: number): Promise<Movie[] | null> => {
    console.log("nextpage :", page);
    try {
      const response = await fetch(url.popular(page), options);
      const data: MovieListResponse = await response.json();
      if (data) {
        setIsLoading(false);
      }
      setTotalResults(data.total_results);
      return data.results;
    } catch (error) {
      setIsError(true);
      console.error("Error fetching data in App:", error);
    }
    return null;
  };

  return { fetchMovies };
};

export default useGetMovieList;
