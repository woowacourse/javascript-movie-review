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
import { DATA } from "./constants/data";
import { KEYWORD } from "./constants/keyword";
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
    movieItemList.renderTitle(movieDataManager.getTitle());
    const response = await movieDataManager.getData(KEYWORD.BLANK);
    checkIsLastData(response);
    const movieDatas = response?.results;
    const movieItems = generateMovieItemElement(movieDatas);

    movieItems?.map((movie: string) => {
      movieItemList.addMovies(movie);
    });
    moreButton.show();
  };

  const renderSearchList = async () => {
    movieItemList.renderTitle(
      searchBox.getKeyword() + movieDataManager.getTitle()
    );
    const response = await movieDataManager.getData(searchBox.getKeyword());
    checkIsLastData(response);
    const movieDatas = response?.results;
    if (checkIsEmptyData(movieDatas)) {
      return;
    }
    const movieItems = generateMovieItemElement(movieDatas);

    movieItems?.map((movie: string) => {
      movieItemList.addMovies(movie);
    });
    moreButton.show();
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

  const checkIsLastData = (response: ResponseInfo) => {
    movieDataManager.checkDataPage(response) && moreButton.hide();
  };

  const checkIsEmptyData = (results: TotalMovieInfoType[]) => {
    if (movieDataManager.checkDataAmount(results) === DATA.EMPTY) {
      moreButton.hide();
      movieItemList.renderNoData();
      return true;
    }
  };

  const checkKeywordEmpty = () => {
    if (searchBox.getKeyword() === KEYWORD.BLANK) {
      moreButton.hide();
      movieItemList.renderNoData();
      return true;
    }
  };

  $(".search-input")?.addEventListener("searchInputChange", (e) => {
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

  renderMovies();
};
