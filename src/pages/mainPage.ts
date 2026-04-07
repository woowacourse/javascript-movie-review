import { createHeader } from "../components/header";
import { createHero } from "../components/hero";
import { createMovieList } from "../components/movie-list";
import { createMoreButton } from "../components/more-button";
import { createFooter } from "../components/footer";
import { createModal } from "../components/modal";
import { MovieList } from "../domains/movie";
import { Router } from "../route/router";

export class MainPage {
  private movieList = new MovieList();
  // private modal = createModal();

  constructor(
    private app: HTMLElement,
    private router: Router,
  ) {}

  render(): void {
    this.app.innerHTML = "";

    const header = createHeader(this.router);
    const hero = createHero({
      movieList: this.movieList,
      onDetailClick: () => this.openModal(),
    });
    const main = this.createMain();
    const footer = createFooter();
    this.app.append(header, hero, main, footer);

    this.movieList.load();
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
      title: "지금 인기 있는 영화",
      movieList: this.movieList,
    });
    main.append(movieListEl, this.createMoreButton());
    return main;
  }

  openModal(): void {
    // this.modal.open();
    console.log("open modal");
  }

  closeModal(): void {
    // this.modal.close();
    console.log("close modal");
  }
}
