import Component from "../common/Component";
import { createMovieElement } from "./Movie";
import { hideSkeleton, renderSkeleton } from "./Skeleton";
import movieClient from "../http/MoveClient";
import { $ } from "../utils/dom";
import { FetchResponse, MovieItem } from "../types/movies";
import { MAX_PAGE } from "../constants/movies";

interface MovieListState {
  currentPage: number;
  searchKeyword: string;
}

export default class MovieList extends Component<{}, MovieListState> {
  protected initializeState() {
    this.state = { currentPage: 0, searchKeyword: "" };
  }

  protected getTemplate() {
    return /*html*/ `
      <h2 id="main-text">지금 인기 있는 영화</h2>
      <div id="movie-list">
        <ul id="movie-list-container" class="item-list">
        </ul>
      </div>
      <div id="empty-result" class="empty-result hidden"></div>
      <button id="next-button" class="btn primary full-width">더 보기</button>
    `;
  }

  protected render() {
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

  private renderMovies(movies: MovieItem[]) {
    const movieList = $<HTMLUListElement>("#movie-list-container");
    if (!movieList) return;

    if (movies.length < 1) {
      this.renderEmptyResult();
      return;
    }

    this.hideEmptyResult();
    movies.forEach((movie) => {
      const { id, title, backdrop_path, vote_average } = movie;
      const movieItem = createMovieElement({ id, title, backdrop_path, vote_average });
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
      .then((res) => {
        res && this.renderMovies(res.results);
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

  private handleRemoveMoreButton() {
    if (!this.state || this.state.currentPage < MAX_PAGE) return;

    const $button = $<HTMLButtonElement>("#next-button");
    $button && $button.remove();
  }

  private updateCurrentPage() {
    if (!this.state) return;

    this.setState({ ...this.state, currentPage: this.state.currentPage + 1 });
    this.handleRemoveMoreButton();
  }

  private async getNextPage() {
    this.updateCurrentPage();
    if (!this.state) return;

    const { currentPage, searchKeyword } = this.state;

    return await movieClient.get<FetchResponse<MovieItem[]>>(currentPage, searchKeyword);
  }

  protected setEvent(): void {
    const button = $<HTMLButtonElement>("#next-button");

    button?.addEventListener("click", () => {
      this.handleRenderMovieList();
    });
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
