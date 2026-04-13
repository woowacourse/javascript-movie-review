import { createHeader } from "../components/header";
import { createMovieList } from "../components/movie-list";
import { createInfiniteScroll } from "../components/infinite-scroll";
import { createFooter } from "../components/footer";
import { Modal } from "../components/modal";
import { MovieList } from "../domains/movie";
import { Router } from "../route/router";

export class SearchPage {
  private movieList = new MovieList();
  private modal = new Modal();
  private query = new URLSearchParams(location.search).get("query") ?? "";

  constructor(
    private app: HTMLElement,
    private router: Router,
  ) {
    this.app.addEventListener("click", (e) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-id]");
      if (card?.dataset.id) this.modal.open(Number(card.dataset.id));
    });
  }

  render(): void {
    this.app.innerHTML = "";

    const header = createHeader(this.router);
    const main = this.createMain();
    const footer = createFooter();

    this.app.append(header, main, footer, this.modal.element);

    this.movieList.load(this.query);
  }

  private createInfiniteScroll(): HTMLElement {
    const { element, disconnect } = createInfiniteScroll(() =>
      this.movieList.loadMore(),
    );

    this.movieList.subscribe(({ error }) => {
      if (this.movieList.isLastPage() || error) disconnect();
    });

    return element;
  }

  private createMain(): HTMLElement {
    const main = document.createElement("main");
    const movieListEl = createMovieList({
      title: `"${this.query}" 검색 결과`,
      movieList: this.movieList,
    });
    const infiniteScroll = this.createInfiniteScroll();
    main.append(movieListEl, infiniteScroll);
    return main;
  }
}
