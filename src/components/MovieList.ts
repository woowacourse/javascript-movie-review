import Component from "../common/Component";
import { createMovieElement } from "./Movie";
import { hideSkeleton, renderSkeleton } from "./Skeleton";
import MovieClient from "../http/MovieClient";
import { $ } from "../utils/dom";
import { MovieType } from "../types";
import { MAX_PAGE } from "../constants/movies";
import { starImage } from "../assets/image";

interface MovieListState {
  currentPage: number;
  searchKeyword: string;
}

export default class MovieList extends Component<{}, MovieListState> {
  constructor($target: HTMLElement) {
    super($target);
  }

  protected getTemplate() {
    return /*html*/ `
      <h2 id="main-text">지금 인기 있는 영화</h2>
      <div id="movie-list">
        <ul id="movie-list-container" class="item-list">
        </ul>
      </div>
      <div id="empty-result" class="empty-result hidden"></div>
      <dialog class="modal">
      </dialog>
    `;
  }

  protected async render() {
    this.state = { currentPage: 0, searchKeyword: "" };
    this.$target.innerHTML = this.getTemplate();
    this.handleRenderMovieList();
  }

  private hideEmptyResult() {
    const emptyResultContainer = $<HTMLDivElement>("#empty-result");
    if (!emptyResultContainer) return;

    emptyResultContainer.classList.add("hidden");
    emptyResultContainer.innerText = "";
  }

  private renderEmptyResult() {
    const emptyResultContainer = $<HTMLDivElement>("#empty-result");
    if (!emptyResultContainer) return;

    emptyResultContainer?.classList.remove("hidden");
    const emptyText = `${this.state?.searchKeyword} 에 대한 검색 결과가 존재하지 않아요..😅\n정확한 검색어를 다시 입력해주세요`;
    emptyResultContainer.innerText = emptyText;
  }

  private renderMovies(movies: MovieType[]) {
    const movieList = $<HTMLUListElement>("#movie-list-container");
    if (!movieList) return;

    if (movies.length < 20) {
      this.renderEmptyResult();
      return;
    }

    this.hideEmptyResult();
    movies.forEach((movie) => {
      const movieItem = createMovieElement(movie);
      movieList.append(movieItem);
    });
  }

  private toggleMainText(text: string = "") {
    const mainText = $<HTMLHeadingElement>("#main-text");
    if (!mainText) return;

    if (text === "") {
      mainText.innerText = `지금 인기 있는 영화`;
    } else {
      mainText.innerText = `"${text}" 검색 결과`;
    }
  }

  private resetCurrentMovieList() {
    const movieList = $<HTMLUListElement>("#movie-list-container");
    if (!movieList) return;

    movieList.innerHTML = "";
  }

  private handleRenderMovieList() {
    renderSkeleton();

    this.getNextPage()
      .then((data) => {
        if (!data || data.length < 20) return;
        this.renderMovies(data);
        const $movies = document.querySelectorAll<HTMLLIElement>("li");
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target === $movies[$movies.length - 1]) {
              observer.unobserve(entry.target);
              this.handleRenderMovieList();
            }
          });
        });

        observer.observe($movies[$movies.length - 1]);
      })
      .catch((error) => {
        if (error instanceof Error) {
          alert(error.message);
        }
      })
      .finally(() => {
        hideSkeleton();
      });
  }

  private updateCurrentPage() {
    if (!this.state) return;

    this.setState({ ...this.state, currentPage: this.state.currentPage + 1 });
  }

  private async getNextPage() {
    this.updateCurrentPage();
    if (!this.state) return;

    const { currentPage, searchKeyword } = this.state;
    if (searchKeyword === "") return MovieClient.getPopularMovies(currentPage);
    return MovieClient.getSearchMovies(currentPage, searchKeyword);
  }

  public handleSearchMovie(searchKeyword: string) {
    this.toggleMainText(searchKeyword);
    this.setState({ currentPage: 0, searchKeyword: searchKeyword });
    this.resetCurrentMovieList();
    this.handleRenderMovieList();
  }

  public handleResetMovieList() {
    this.toggleMainText();
    this.setState({ currentPage: 0, searchKeyword: "" });
    this.resetCurrentMovieList();
    this.handleRenderMovieList();
  }
}
