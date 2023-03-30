import MovieItem from "./components/MovieItem";
import MovieListContainer from "./components/MovieListContainer";
import NavBar from "./components/NavBar";
import { $ } from "./utils/domSelector";

class App {
  constructor() {
    this.render();
    this.initEvents();
    this.setScrollObserver();
  }

  async render() {
    $<HTMLDivElement>("#app").insertAdjacentHTML("afterbegin", NavBar.render());
    $<HTMLElement>("main").insertAdjacentHTML(
      "afterbegin",
      MovieListContainer.render()
    );
  }

  initEvents() {
    NavBar.bindSubmitEvent();
    MovieListContainer.bindClickEvent();
  }

  setScrollObserver() {
    const observer = new IntersectionObserver(
      (entry) => {
        const [targetElement] = entry;

        if (targetElement.isIntersecting) {
          MovieListContainer.onScroll();
        }
        MovieItem.removeSkeleton();
      },
      {
        root: document.querySelector("#scrollArea"),
      }
    );

    observer.observe($<HTMLDivElement>("#movie-list-end"));
  }
}

new App();
