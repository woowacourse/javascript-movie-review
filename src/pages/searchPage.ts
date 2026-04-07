import { createHeader } from "../components/header";
import { createMovieList } from "../components/movie-list";
import { createMoreButton } from "../components/more-button";
import { createFooter } from "../components/footer";
import { MovieList } from "../domains/movie";
import { Router } from "../route/router";

export class SearchPage {
  private movieList = new MovieList();
  private query = new URLSearchParams(location.search).get("query") ?? "";

  constructor(
    private app: HTMLElement,
    private router: Router,
  ) {}

  render(): void {
    this.app.innerHTML = "";

    const header = createHeader(this.router);
    const main = this.createMain();
    const footer = createFooter();

    this.app.append(header, main, footer);

    this.movieList.load(this.query);
  }

  private createMoreButton(): HTMLButtonElement {
    const moreButton = createMoreButton(() => this.movieList.loadMore());

    this.movieList.subscribe(({ isPending }) => {
      moreButton.hidden = this.movieList.isLastPage();
      moreButton.disabled = isPending;
    });

    return moreButton;
  }

  private createMain(): HTMLElement {
    const main = document.createElement("main");
    const movieListEl = createMovieList({
      title: `"${this.query}" 검색 결과`,
      movieList: this.movieList,
    });
    main.append(movieListEl, this.createMoreButton());
    return main;
  }
}
