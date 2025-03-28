// App.ts
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Banner from "./components/Banner/index";
import MovieList from "./components/MovieList/index";
import { fetchPopularMovies, fetchSearchedMovies } from "./APIs/movieAPI";
import Store from "./store/store";
import { MOVIE_COUNT } from "./constants/config";
import { getCurrentPage, isScrolledToBottom, withLoading } from "./utils/utils";
import { appendHTML } from "./utils/templateUtils";

class App {
  private $target: HTMLElement;
  private store: Store;
  private $bannerContainer: HTMLElement;
  private $mainContainer: HTMLElement;
  $bannerComponent: Banner;
  $movieListComponent: MovieList;

  constructor($target: HTMLElement) {
    this.$target = $target;
    this.store = new Store({
      movies: [],
      query: "",
      searchedMoviesLength: 0,
      loading: false,
      starRatings: localStorage.getItem("starRatings")
        ? JSON.parse(localStorage.getItem("starRatings") as string)
        : [],
    });

    appendHTML(this.$target, Header(this.store));

    this.$bannerContainer = document.createElement("section");
    this.$bannerContainer.id = "banner-container";
    this.$target.appendChild(this.$bannerContainer);

    this.$mainContainer = document.createElement("section");
    this.$mainContainer.classList.add("container");
    this.$target.appendChild(this.$mainContainer);

    appendHTML(this.$target, Footer());

    this.$bannerComponent = new Banner(this.$bannerContainer, this.store);
    this.$movieListComponent = new MovieList(this.$mainContainer, this.store);

    if (this.store.getState().movies.length === 0) {
      this.loadPopularMovies();
    }

    this.attachScrollEvent(this.store);
  }

  private async loadPopularMovies(): Promise<void> {
    this.store.setState({ loading: true });
    const movies = await fetchPopularMovies((error: Error) =>
      alert(error.message)
    );
    this.store.setState({ movies, loading: false });
  }

  private attachScrollEvent(store: Store): void {
    window.addEventListener("scroll", async () => {
      if (isScrolledToBottom()) {
        const state = store.getState();
        const currentPage = getCurrentPage(
          state.movies.length,
          MOVIE_COUNT.UNIT
        );
        if (
          !state.query &&
          state.movies.length < MOVIE_COUNT.MAX_PAGE * MOVIE_COUNT.UNIT
        ) {
          const newMovies = await withLoading(store, () =>
            fetchPopularMovies(
              (error: Error) => alert(error.message),
              currentPage
            )
          );
          store.setState({ movies: [...state.movies, ...newMovies] });
        } else if (
          state.query &&
          state.movies.length < state.searchedMoviesLength
        ) {
          const newMoviesData = await withLoading(store, () =>
            fetchSearchedMovies(
              state.query,
              (error: Error) => alert(error.message),
              currentPage
            )
          );
          store.setState({
            movies: [...state.movies, ...newMoviesData.results],
          });
        }
      }
    });
  }
}

export default App;
