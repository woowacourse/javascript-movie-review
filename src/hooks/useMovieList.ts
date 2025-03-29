import useGetMovieList from "../apis/movies/useGetMovieList";
import useGetMoreMovieList from "../apis/movies/useGetMoreMovieList";
import useInfiniteScroll from "./useInfiniteScroll";
import { movies, totalResults, setMovies } from "../store/store";

const useMovieList = () => {
  const { fetchMovies, isLoading } = useGetMovieList();
  const { fetchMoreMovies, isMoreError } = useGetMoreMovieList();

  const setupInfiniteScroll = () => {
    if (movies.length < totalResults) {
      useInfiniteScroll(() => {
        fetchMoreMovies(fetchMovies);
      });
    }
  };

  const loadInitialMovies = () => {
    if (movies.length === 0) {
      fetchMovies(1).then((results) => {
        if (results) {
          setMovies(results.data ?? []);
        }
      });
    }
  };

  return {
    isLoading,
    isMoreError,
    setupInfiniteScroll,
    loadInitialMovies,
  };
};

export default useMovieList;
