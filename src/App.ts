import {
  CurrentTab,
  MovieDetailInfo,
  TotalMovieInfo,
} from "./@types/movieDataType";
import { getKeywordData } from "./api/keywordSearch";
import { getMovieDetail } from "./api/movieDetail";
import { getMovieData } from "./api/movieList";
import { ErrorComment } from "./components/ErrorComment";
import { MovieDatailModal } from "./components/MovieDetail";
import { MovieItem } from "./components/MovieItem";
import MovieItemList from "./components/MovieItemList";
import SearchBox from "./components/SearchBox";
import { StarInput } from "./components/StarInput";
import { MOVIE_DATA } from "./constants/data";
import { KEYWORD } from "./constants/keyword";
import MovieDataManager from "./domain/MovieDataManager";
import { loadDataByInfiniteScroll } from "./utils/infiniteScroll";
import { $, $$ } from "./utils/selector";

export const App = async () => {
  const movieDataManager = new MovieDataManager();
  const movieItemList = new MovieItemList();
  const searchBox = new SearchBox();

  const generateMovieItemElement = (movieInfo: MovieDetailInfo[]) => {
    movieInfo.forEach((item) => {
      new MovieItem(item, item.id);
      renderMovieDetail(item);
    });
  };

  const renderMovieDetail = async (movieData: MovieDetailInfo) => {
    const targetMovie = document.getElementById(
      String(movieData.id)
    ) as HTMLElement;

    try {
      const detailData = await getMovieDetail(movieData.id);

      targetMovie.addEventListener("clickMovieItem", () => {
        new MovieDatailModal(detailData);
        new StarInput(movieData.id);
      });
    } catch (e) {
      new ErrorComment(Number(e));
    }
  };

  const renderMovieList = async () => {
    movieDataManager.updatePage();

    try {
      const response = await getMovieData(movieDataManager.getCurrenPage());
      const movieDatas = response?.results;

      movieItemList.renderTitle(
        movieItemList.getTitle(movieDataManager.getCurrentTab())
      );
      movieDataManager.checkIsLastPage(response) &&
        $(".scroll-target")?.remove();
      generateMovieItemElement(movieDatas);
    } catch (e) {
      new ErrorComment(Number(e));
    }
  };

  const renderSearchList = async () => {
    movieDataManager.updatePage();

    try {
      const response = await getKeywordData(
        movieDataManager.getCurrenPage(),
        searchBox.getKeyword()
      );
      const movieDatas = response?.results;

      movieItemList.renderTitle(
        searchBox.getKeyword() +
          movieItemList.getTitle(movieDataManager.getCurrentTab())
      );
      movieDataManager.checkIsLastPage(response) &&
        $(".scroll-target")?.remove();
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

  const renderScrollData = () => {
    if ($$(".item-card").length >= 20) {
      const currentTitle = $("h2") as HTMLElement;
      currentTitle.remove();
      renderMovies();
      return true;
    }
    return false;
  };

  const target = document.querySelector(".scroll-target") as HTMLElement;
  (await loadDataByInfiniteScroll(target, renderScrollData)).observe(target);

  renderMovies();

  $(".search-input")?.addEventListener("completeInput", () => {
    checkKeywordEmpty();
    movieDataManager.convertTab(CurrentTab.SEARCH);
    renderMovies();
  });

  $(".logo")?.addEventListener("click", () => {
    window.location.reload();
  });
};
