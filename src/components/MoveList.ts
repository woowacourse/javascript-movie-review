import Component from "../common/Component";
import { $ } from "../utils/dom";
import { starImage } from "../assets/image";
import { createElement } from "../utils/dom";
import movieClient from "../http/MoveClient";
import { getMovies } from "../http/MoveClient";
import { createMovie } from "./Movie";
import { MovieItem } from "../types/movies";
import { hideSkeleton, renderSkeleton } from "../handlers/skeleton";

export default class MovieList extends Component<HTMLDivElement, {}> {
  protected initializeState(): void {
    this.state = { currentPage: 0, searchKeyword: "", renderType: "popular" };
  }

  protected getTemplate(): string {
    return /*html*/ `
      <h2 id="main-text">지금 인기 있는 영화</h2>
      <div id="movie-list">
        <ul id="movie-list-container" class="item-list">
        </ul>
      </div>
      <button id="next-button" class="btn primary full-width">더 보기</button>
    `;
  }

  protected render() {
    this.$target.innerHTML = this.getTemplate();
    this.handleRenderMovieList();
  }

  private renderMovies(movies: any[]) {
    const movieList = $<HTMLUListElement>("#movie-list-container");
    movies.forEach((movie) => {
      const movieItem = createMovie({ id: 1, title: movie.title, imgPath: movie.backdrop_path, voteAverage: movie.vote_average });
      movieList?.append(movieItem);
    });
  }

  private toggleMainText(text: string = "") {
    const mainText = $<HTMLHeadingElement>("#main-text");
    if (!mainText) return;

    if (text === "") {
      mainText.innerText = `지금 인기 있는 영화`;
    } else {
      mainText.innerText = `${text} 검색 결과`;
    }
  }

  private resetCurrentMovieList() {
    const movieList = $<HTMLUListElement>("#movie-list-container");
    if (!movieList) return;

    movieList.innerHTML = "";
  }

  public handleSearchMovie(searchKeyword: string) {
    this.toggleMainText(searchKeyword);
    this.setState({ currentPage: 0, searchKeyword: searchKeyword, renderType: "search" });
    this.resetCurrentMovieList();
    this.handleRenderMovieList();
  }

  public handleResetMovieList() {
    this.toggleMainText();
    this.setState({ currentPage: 0, searchKeyword: "", renderType: "popular" });
    this.resetCurrentMovieList();
    this.handleRenderMovieList();
  }

  async handleRenderMovieList() {
    renderSkeleton();
    const data = await this.getNextPage();
    hideSkeleton();
    this.renderMovies(data.results);
  }

  protected setEvent(): void {
    const button = $<HTMLButtonElement>("#next-button");
    button?.addEventListener("click", () => {
      this.handleRenderMovieList();
    });
  }

  private async getNextPage() {
    this.setState({ ...this.state, currentPage: this.state.currentPage + 1 });
    const { currentPage, searchKeyword, renderType } = this.state;

    console.log(currentPage, searchKeyword, renderType);
    //      --url 'https://api.themoviedb.org/3/search/movie?query=%ED%95%B4%EB%A6%AC&include_adult=false&language=ko-KR&page=1' \

    if (renderType === "popular") {
      return await movieClient.fetch(`movie/${this.state.renderType}?language=ko-KR&page=${this.state.currentPage}`).then((res) => res.json());
    } else if (renderType === "search") {
      return await movieClient
        .fetch(`search/movie?query=${searchKeyword}&include_adult=false&language=ko-KR&page=${currentPage}`)
        .then((res) => res.json());
    }
  }
}
