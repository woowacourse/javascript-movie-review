import MOVIE_LIST_BOX_TITLE from "../constants/movieListBoxTitle";
import MovieHeader from "./MovieHeader/MovieHeader";
import MovieMain from "./MovieMain/MovieMain";
import createElement from "./utils/createElement";
import generateScrollTopButton from "./common/generateScrollTopButton";
import getMovieListByQuery from "../domain/getMovieListByQuery";
import getPopularMovieList from "../domain/getPopularMovieList";

class App {
  private FIRST_PAGE = 1;

  private currentPage = this.FIRST_PAGE;

  private movieMain;
  private query = "";

  constructor($root: HTMLElement) {
    this.movieMain = new MovieMain({
      title: MOVIE_LIST_BOX_TITLE.popular,
      getMoreMovies: this.renderNextPage.bind(this),
    });

    $root.append(
      new MovieHeader({
        logoClickHandler: this.logoClickHandler.bind(this),
        searchBoxSubmitHandler: this.searchBoxSubmitHandler.bind(this),
      }).$element,
      this.movieMain.$element,
      generateScrollTopButton()
    );
    this.renderPopularMovieList();
  }

  private logoClickHandler() {
    this.query = "";
    this.currentPage = this.FIRST_PAGE;

    this.movieMain.changeMovieListBox({
      title: MOVIE_LIST_BOX_TITLE.popular,
      getMoreMovies: this.renderNextPage.bind(this),
    });

    this.renderPopularMovieList();
  }

  private searchBoxSubmitHandler(query: string) {
    this.currentPage = this.FIRST_PAGE;
    this.query = query;

    this.movieMain.changeMovieListBox({
      title: MOVIE_LIST_BOX_TITLE.search(query),
      getMoreMovies: this.renderSearchNextPage.bind(this),
    });
    this.searchMovies(query);
  }

  private renderNextPage() {
    this.currentPage += 1;
    this.renderPopularMovieList();
  }

  private renderSearchNextPage() {
    this.currentPage += 1;
    this.searchMovies(this.query);
  }

  private async renderPopularMovieList() {
    try {
      const { movieList, totalPage } = await getPopularMovieList({
        page: this.currentPage,
      });

      if (this.currentPage === totalPage) {
        this.movieMain.removeMovieMoreObserver();
      }

      this.movieMain.reRender(movieList);
    } catch (error) {
      if (error instanceof Error) {
        this.currentPage -= 1;
        this.movieMain.renderMessage(error.message);
        this.movieMain.reRender([]);
      }
    }
  }

  private async searchMovies(query: string) {
    try {
      const { movieList, totalPage } = await getMovieListByQuery({
        page: this.currentPage,
        query,
      });

      if (!movieList.length) {
        this.renderNoResult("검색 결과가 없습니다.");
      }

      if (this.currentPage === totalPage) {
        this.movieMain.removeMovieMoreObserver();
      }

      this.movieMain.reRender(movieList);
    } catch (error) {
      if (error instanceof Error) {
        this.currentPage -= 1;
        this.renderNoResult(error.message);
        this.movieMain.reRender([]);
      }
    }
  }

  private renderNoResult(message: string) {
    this.movieMain.removeMovieMoreObserver();
    this.movieMain.renderMessage(message);
  }
}

export default App;
