import {
  Movie,
  MovieListResponse,
} from "../../../types/responseType/responseType";
import {
  movies,
  setIsError,
  // setIsLoading,
  setMovies,
  setTotalResults,
  isLoading,
} from "../../store/store";
import { useState } from "../../utils/Core";
import { options, url } from "../config/config";

export interface FetchMoviesResponse {
  isLoading?: boolean;
  data: Movie[] | null;
}

const useGetMovieList = () => {
  const fetchMovies = async (page: number): Promise<FetchMoviesResponse> => {
    const [isLoading, setIsLoading] = useState(false);
    try {
      const response = await fetch(url.popular(page), options);
      const data: MovieListResponse = await response.json();

      if (data) {
        setIsLoading(false);
      }

      setMovies([...movies, ...data.results]);
      setTotalResults(data.total_results);
      return { isLoading, data: data.results };
    } catch (error) {
      setIsError(true);
      console.error("Error fetching data in App:", error);
    }
    return { isLoading, data: null };
  };

  return { fetchMovies, isLoading };
};

export default useGetMovieList;
