import { MoviesResponse } from "../../types/movie";
import { handleApiResponse } from "../api/handlers";
import { getMovies, searchMovies } from "../api/movie";
import App from "../components/App";
import Header from "../components/Layout/Header";
import Main from "../components/Layout/Main";
import { MAX_MOVIE_PAGE, PREFIX_POSTER_PATH } from "../constants/constants";
import { store } from "./../stores";

const toggleShowMoreButton = () => {
  const $showMore = document.querySelector(".show-more");
  if (store.page !== Math.min(MAX_MOVIE_PAGE, store.totalPages))
    $showMore?.classList.add("open");
  else $showMore?.classList.remove("open");
};

const setHeaderData = () => {
  const header = Header.getInstance();

  const firstMovieData = store.movies[0];
  if (!firstMovieData) return;

  header.setState({
    posterImage: `${PREFIX_POSTER_PATH}${firstMovieData.poster_path}`,
    title: firstMovieData.title,
    voteAverage: firstMovieData.vote_average,
  });
};

const renderTotalList = async (main: Main) => {
  const moviesResponse = await getMovies({ page: store.page });

  handleApiResponse<MoviesResponse>(moviesResponse, {
    onSuccess: (data) => {
      store.movies = [...store.movies, ...data.results];
      store.totalPages = data.total_pages;

      setHeaderData();

      main.setState({
        movies: store.movies,
        isLoading: false,
      });
    },
    onError: (error) => {
      main.setState({
        isLoading: false,
        error: error,
      });
    },
  });
};

const renderSearchList = async (main: Main) => {
  setHeaderData();

  const moviesResponse = await searchMovies({
    name: store.searchKeyword,
    page: store.page,
  });

  handleApiResponse<MoviesResponse>(moviesResponse, {
    onSuccess: (data) => {
      store.movies = [...store.movies, ...data.results];
      store.totalPages = data.total_pages;

      main.setState({
        movies: store.movies,
        isLoading: false,
        error: store.movies.length === 0 ? "검색 결과가 없습니다." : null,
      });
    },
    onError: (error) => {
      main.setState({
        isLoading: false,
        error: error,
      });
    },
  });
};

export const updateMoviesList = async () => {
  const main = Main.getInstance();

  if (store.searchKeyword === "") await renderTotalList(main);
  else await renderSearchList(main);

  main.render();
  toggleShowMoreButton();
};

export const initializeLayout = () => {
  const $app = document.querySelector("#app");
  $app?.append(App());
};
