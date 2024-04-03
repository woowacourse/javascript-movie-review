import MOVIE_LIST_BOX_TITLE from "../constants/movieListBoxTitle";
import MovieHeader from "./MovieHeader/MovieHeader";
import MovieMain from "./MovieMain/MovieMain";
import generateScrollTopButton from "./common/generateScrollTopButton";
import getMovieListByQuery from "../domain/getMovieListByQuery";
import getPopularMovieList from "../domain/getPopularMovieList";

class App {
  private currentPage = new Page();

  private movieMain;
  private query = "";

  constructor($root: HTMLElement) {
    this.movieMain = new MovieMain({
      title: MOVIE_LIST_BOX_TITLE.popular,
      getMoreMovies: () => {
        this.renderPage({ renderFn: this.renderPopularMovieList.bind(this) });
      },
    });

    this.firstRender($root);
  }

  private firstRender($root: HTMLElement) {
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
    this.currentPage = new Page();

    this.movieMain.changeMovieListBox({
      title: MOVIE_LIST_BOX_TITLE.popular,
      getMoreMovies: () => {
        this.renderPage({ renderFn: this.renderPopularMovieList.bind(this) });
      },
    });

    this.renderPopularMovieList();
  }

  private searchBoxSubmitHandler(query: string) {
    this.currentPage = new Page();
    this.query = query;

    this.movieMain.changeMovieListBox({
      title: MOVIE_LIST_BOX_TITLE.search(query),
      getMoreMovies: () => {
        this.renderPage({
          renderFn: () => this.searchMovies.bind(this)(this.query),
        });
      },
    });
    this.searchMovies(query);
  }

  private renderPage({
    renderFn,
    page,
  }: {
    page?: number;
    renderFn: () => void;
  }) {
    if (page) {
      this.currentPage.setPage(page);
    } else {
      this.currentPage.nextPage();
    }
    renderFn();
  }

  private async renderPopularMovieList() {
    try {
      const { movieList, totalPage } = await getPopularMovieList({
        page: this.currentPage.page,
      });

      if (this.currentPage.equalPage(totalPage)) {
        this.movieMain.removeMovieMoreObserver();
      }

      this.movieMain.reRender(movieList);
    } catch (error) {
      if (error instanceof Error) {
        this.currentPage.previousPage();
        this.movieMain.renderMessage(error.message);
        this.movieMain.reRender([]);
      }
    }
  }

  private async searchMovies(query: string) {
    try {
      const { movieList, totalPage } = await getMovieListByQuery({
        page: this.currentPage.page,
        query,
      });

      if (!movieList.length) {
        this.renderNoResult("검색 결과가 없습니다.");
      }

      if (this.currentPage.equalPage(totalPage)) {
        this.movieMain.removeMovieMoreObserver();
      }

      this.movieMain.reRender(movieList);
    } catch (error) {
      if (error instanceof Error) {
        this.currentPage.previousPage();
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

class Page {
  private FIRST_PAGE = 1;
  page: number;

  constructor(page?: number) {
    this.page = page || this.FIRST_PAGE;
  }

  nextPage() {
    this.page++;
  }

  previousPage() {
    this.page--;
  }

  setPage(page: number) {
    this.page = page;
  }

  equalPage(page: number) {
    if (this.page === page) {
      return true;
    }
    return false;
  }
}
