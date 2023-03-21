import {
  CurrentTab,
  MovieInfoType,
  ResponseInfo,
  TotalMovieInfoType,
} from "./@types/movieDataType";
import MoreButton from "./components/moreButton";
import { MovieItem } from "./components/MovieItem";
import MovieItemList from "./components/MovieItemList";
import SearchBox from "./components/SearchBox";
import MovieDataManager from "./domain/MovieDataManager";
import { $ } from "./utils/selector";

export const App = async () => {
  const movieDataManager = new MovieDataManager();
  const movieItemList = new MovieItemList();
  const searchBox = new SearchBox();
  const moreButton = new MoreButton();

  const generateMovieItemElement = (movieInfo: MovieInfoType[]) => {
    const movieElement = movieInfo?.map((movie) => {
      return MovieItem(movie);
    });

    return movieElement;
  };

  const renderMovieList = async () => {
    const response = await movieDataManager.getData("");
    checkIsLastData(response);
    const movieDatas = response?.results;
    const movieItems = generateMovieItemElement(movieDatas);

    movieItemList.renderTitle(movieDataManager.getTitle());
    movieItems?.map((movie: string) => {
      movieItemList.addMovies(movie);
    });
    moreButton.show();
  };

  const renderSearchList = async () => {
    const response = await movieDataManager.getData(searchBox.getKeyword());
    checkIsLastData(response);
    const movieDatas = response?.results;
    if (checkIsEmptyData(movieDatas)) {
      return;
    }
    const movieItems = generateMovieItemElement(movieDatas);

    movieItemList.renderTitle(
      searchBox.getKeyword() + movieDataManager.getTitle()
    );
    movieItems?.map((movie: string) => {
      movieItemList.addMovies(movie);
    });
    moreButton.show();
  };

  const renderMovies = async () => {
    if (movieDataManager.getCurrentTab() === "popular") {
      await renderMovieList();
      return;
    }
    if (movieDataManager.getCurrentTab() === "search") {
      await renderSearchList();
      return;
    }
  };

  const checkIsLastData = (response: ResponseInfo) => {
    movieDataManager.checkDataPage(response) && moreButton.hide();
  };

  const checkIsEmptyData = (results: TotalMovieInfoType[]) => {
    if (movieDataManager.checkDataAmount(results) === 0) {
      moreButton.hide();
      movieItemList.renderNoData();
      return true;
    }
  };

  $(".search-input")?.addEventListener("searchInputChange", (e) => {
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

  renderMovies();
};
