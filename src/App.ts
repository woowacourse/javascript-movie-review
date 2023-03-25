import {
  CurrentTab,
  DetailInfo,
  MovieInfo,
  TotalMovieInfo,
} from "./@types/movieDataType";
import { getKeywordData } from "./api/keywordSearch";
import { getMovieDetail } from "./api/movieDetail";
import { getMovieData } from "./api/movieList";
import { ErrorComment } from "./components/ErrorComment";
import { MovieDatail } from "./components/MovieDetail";
import { MovieItem } from "./components/MovieItem";
import MovieItemList from "./components/MovieItemList";
import SearchBox from "./components/SearchBox";
import { StarInput } from "./components/StarInput";
import { MOVIE_DATA } from "./constants/data";
import { KEYWORD } from "./constants/keyword";
import MovieDataManager from "./domain/MovieDataManager";
import { loadDataByInfiniteScroll } from "./utils/infiniteScroll";
import { $ } from "./utils/selector";

export const App = async () => {
  const movieDataManager = new MovieDataManager();
  const movieItemList = new MovieItemList();
  const searchBox = new SearchBox();

  const renderMovieDetail = async (movieData: DetailInfo) => {
    const targetMovie = document.getElementById(
      String(movieData.id)
    ) as HTMLElement;
    try {
      const detailData = await getMovieDetail(movieData.id);
      targetMovie.addEventListener("clickMovieItem", () => {
        new MovieDatail(detailData);
        new StarInput(movieData.id);
      });
    } catch (e) {
      new ErrorComment(Number(e));
    }
  };

  const generateMovieItemElement = (movieInfo: DetailInfo[]) => {
    movieInfo.forEach((item) => {
      new MovieItem(item, item.id);
      renderMovieDetail(item);
    });
  };

  const renderMovieList = async () => {
    movieItemList.renderTitle(
      movieItemList.getTitle(movieDataManager.getCurrentTab())
    );
    movieDataManager.updatePage();
    try {
      const response = await getMovieData(movieDataManager.getCurrenPage());
      movieDataManager.checkIsLastPage(response) &&
        $(".scroll-target")?.remove();
      const movieDatas = response?.results;
      generateMovieItemElement(movieDatas);
    } catch (e) {
      new ErrorComment(Number(e));
    }
  };

  const renderSearchList = async () => {
    movieItemList.renderTitle(
      searchBox.getKeyword() +
        movieItemList.getTitle(movieDataManager.getCurrentTab())
    );
    movieDataManager.updatePage();
    try {
      const response = await getKeywordData(
        movieDataManager.getCurrenPage(),
        searchBox.getKeyword()
      );
      movieDataManager.checkIsLastPage(response) &&
        $(".scroll-target")?.remove();
      const movieDatas = response?.results;
      if (checkIsEmptyData(movieDatas)) {
        return;
      }
      generateMovieItemElement(movieDatas);
    } catch (e) {
      new ErrorComment(Number(e));
    }
  };

  const renderMovies = async () => {
    if (movieDataManager.getCurrentTab() === CurrentTab.POPULAR) {
      await renderMovieList();
      return;
    }
    if (movieDataManager.getCurrentTab() === CurrentTab.SEARCH) {
      await renderSearchList();
      return;
    }
  };

  const checkIsEmptyData = (results: TotalMovieInfo[]) => {
    if (movieDataManager.checkDataAmount(results) === MOVIE_DATA.EMPTY) {
      movieItemList.renderNoData(searchBox.getKeyword());
      return true;
    }
  };

  const checkKeywordEmpty = () => {
    if (searchBox.getKeyword() === KEYWORD.BLANK) {
      movieItemList.renderNoData(searchBox.getKeyword());
      return true;
    }
  };

  $(".search-input")?.addEventListener("completeInput", (e) => {
    checkKeywordEmpty();
    movieDataManager.convertTab(CurrentTab.SEARCH);
    renderMovies();
  });

  $(".primary")?.addEventListener("clickMoreButton", () => {
    renderMovies();
  });

  $(".logo")?.addEventListener("click", () => {
    movieDataManager.convertTab(CurrentTab.POPULAR);
    searchBox.resetInput();
    renderMovies();
  });

  $(".ch-logo")?.addEventListener("mouseenter", () => {
    $(".ch-box")?.classList.remove("hidden");
  });

  $(".ch-logo")?.addEventListener("mouseleave", () => {
    $(".ch-box")?.classList.add("hidden");
  });

  renderMovies();

  const target = document.querySelector(".scroll-target") as HTMLElement;
  (await loadDataByInfiniteScroll(target, renderMovies)).observe(target);
};
