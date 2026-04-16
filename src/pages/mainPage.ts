import { createHeader } from "../components/header";
import { createHero } from "../components/hero";
import { createMovieList } from "../components/movie-list";
import { createInfiniteScroll } from "../components/infinite-scroll";
import { createFooter } from "../components/footer";
import { Modal } from "../components/modal";
import { MovieListService } from "../services/movie/MovieListService";
import { Router } from "../route/router";

export class MainPage {
  private movieList = new MovieListService();
  private modal = new Modal();

  constructor(
    private app: HTMLElement,
    private router: Router,
  ) {
    this.app.addEventListener("click", this.handleClick);
  }

  destroy(): void {
    this.app.removeEventListener("click", this.handleClick);
  }

  render(): void {
    this.app.innerHTML = "";

    const header = createHeader(this.router);
    const hero = createHero({ movieList: this.movieList });
    const main = this.createMain();
    const footer = createFooter();
    this.app.append(header, hero, main, footer, this.modal.element);

    this.movieList.load();
  }

  private handleClick = (e: MouseEvent): void => {
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-id]");
    if (card?.dataset.id) this.modal.open(Number(card.dataset.id));
  };

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
      title: "지금 인기 있는 영화",
      movieList: this.movieList,
    });
    const infiniteScroll = this.createInfiniteScroll();
    main.append(movieListEl, infiniteScroll);
    return main;
  }
}
