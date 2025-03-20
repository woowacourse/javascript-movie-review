import {
  Movie,
  MovieListResponse,
} from "../../../types/responseType/responseType";
import {
  movies,
  setIsError,
  setIsLoading,
  setMovies,
  setTotalResults,
} from "../../store/store";
import { url } from "../config/config";

const useGetMovieList = () => {
  const fetchMovies = async (page: number): Promise<Movie[] | null> => {
    try {
      const response = await fetch(url.popular(page), {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        method: "GET",
      });
      const data: MovieListResponse = await response.json();
      if (data) {
        setIsLoading(false);
      }
      setMovies([...movies, ...data.results]);
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
