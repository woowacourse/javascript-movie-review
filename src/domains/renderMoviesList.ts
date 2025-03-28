import { getGenres, getMovies, searchMovies } from "../api/services/movie";
import { GenresResponse, MoviesResponse } from "../api/types/movie/response";
import { handleApiResponse } from "../api/utils/handlers";
import App from "../components/App";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import { PREFIX_POSTER_PATH } from "../constants/constants";
import { store } from "../stores";

const setHeaderData = () => {
  const header = Header.getInstance();

  const firstMovieData = store.movies[0];
  if (!firstMovieData) return;

  header.setState({
    id: firstMovieData.id,
    posterImage: `${PREFIX_POSTER_PATH}${firstMovieData.poster_path}`,
    title: firstMovieData.title,
    voteAverage: firstMovieData.vote_average,
    isLoading: false,
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
    page: store.page,
    title: store.searchKeyword,
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

export const getGenreList = async () => {
  const genreResponse = await getGenres();

  handleApiResponse<GenresResponse>(genreResponse, {
    onSuccess: (data) => (store.genres = data.genres),
  });
};

export const updateMoviesList = async () => {
  const main = Main.getInstance();

  if (store.searchKeyword === "") await renderTotalList(main);
  else await renderSearchList(main);

  main.render();
  // TODO: 무한 스크롤 로직 추가
};

export const initializeLayout = async () => {
  const $app = document.querySelector("#app");
  $app?.append(App.getInstance().getElement());

  await updateMoviesList();
};
