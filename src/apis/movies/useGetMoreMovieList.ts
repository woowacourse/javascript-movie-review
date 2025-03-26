import {
  appendMovies,
  appendSearchResults,
  currentPage,
  searchInputValue,
  setIsMoreError,
  isMoreError,
} from "../../store/store";
import { options, url } from "../config/config";
import { FetchMoviesResponse } from "./useGetMovieList";

const useGetMoreMovieList = () => {
  const fetchMoreMovies = async (
    callback: (page: number) => Promise<FetchMoviesResponse>
  ): Promise<FetchMoviesResponse> => {
    const nextPage = currentPage + 1;

    if (searchInputValue.trim()) {
      // 검색 결과가 있으면
      try {
        const response = await fetch(url.more(nextPage), options);
        const data = await response.json();
        appendSearchResults(data.results);

        return data.results;
      } catch (error) {
        console.error("Error fetching search results:", error);
        setIsMoreError(true);
      }
      return { isLoading: false, data: null };
    } else {
      // 첫 화면에서 더보기 버튼 누를 때
      const newMovies = await callback(nextPage);
      if (newMovies) {
        appendMovies(newMovies.data ?? []);
      }
      return newMovies;
    }
  };
  return { fetchMoreMovies, isMoreError };
};

export default useGetMoreMovieList;
