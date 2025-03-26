import { MoviesResponse } from "../../types/movie";
import { handleApiResponse } from "../api/handlers";
import { getMovies, searchMovies } from "../api/movie";
import { App, Main, TopRatedMovie } from "../components/index";
import {
  DEFAULT_MOVIE_DATA,
  MAX_MOVIE_PAGE,
  PREFIX_POSTER_PATH,
} from "../constants/constants";
import { store } from "./../stores";

const changeHeaderBackground = () => {
  const $backgroundContainer = document.querySelector(".background-container");

  if (store.searchKeyword === "") {
    const posterImage = store.movies[0].poster_path
      ? `${PREFIX_POSTER_PATH}${store.movies[0].poster_path}`
      : DEFAULT_MOVIE_DATA.posterPath;
    ($backgroundContainer as HTMLElement)!.style.backgroundImage = `url(${posterImage})`;
  } else {
    ($backgroundContainer as HTMLElement)!.style.backgroundImage = "";
  }
};

const renderHeaderBackground = () => {
  if (!document.querySelector(".top-rated-movie")) {
    const $topRatedContainer = document.querySelector(".top-rated-container");
    $topRatedContainer?.append(
      TopRatedMovie({
        title: store.movies[0].title ?? DEFAULT_MOVIE_DATA.title,
        voteAverage:
          store.movies[0].vote_average ?? DEFAULT_MOVIE_DATA.voteAverage,
      })
    );
  }
};

const renderTotalList = async (main: Main) => {
  const moviesResponse = await getMovies({ page: store.page });

  handleApiResponse<MoviesResponse>(moviesResponse, {
    onSuccess: (data) => {
      store.movies = [...store.movies, ...data.results];
      store.totalPages = data.total_pages;

      main.setState({
        movies: store.movies,
        isLoading: false,
      });

      renderHeaderBackground();
      changeHeaderBackground();
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
  changeHeaderBackground();

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

  // TODO: 더보기 버튼 로직 분리
  const $showMore = document.querySelector(".show-more");
  if (store.page !== Math.min(MAX_MOVIE_PAGE, store.totalPages))
    $showMore?.classList.add("open");
  else $showMore?.classList.remove("open");
};

export const initializeLayout = () => {
  const $app = document.querySelector("#app");
  $app?.append(App());
};
