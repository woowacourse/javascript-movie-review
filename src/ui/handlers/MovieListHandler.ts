import Movie from "../../domain/models/Movie.js";
import MovieList from "../components/MovieList.js";
import MovieService from "../../domain/services/MovieService.js";
import MovieCard from "../components/Movie.js";
import { store } from "../../store/store.js";
import { MOVIES_PER_ROW } from "../../constants/ui.js";

export default class MovieListHandler {
  private movieList: MovieList | undefined;
  private movieService: MovieService;
  private isLoadingMore: boolean = false;

  constructor(movieService: MovieService) {
    this.movieService = movieService;
  }

  async initMovieList(query?: string) {
    if (!query) {
      this.showHeader();
    }

    const moviesData = query
      ? await this.movieService.searchMovies(query, 1)
      : await this.movieService.getPopularResults();

    this.updateMovieList(moviesData);
    this.movieList?.updateMovieListTitle(query);
    this.setupInfiniteScroll();
  }

  private updateMovieList(moviesData: {
    movies: Movie[];
    page: number;
    totalPages: number;
  }) {
    MovieList.removeMovieList();
    this.movieList = new MovieList(
      ".thumbnail-list",
      moviesData.movies,
      moviesData.page,
      moviesData.totalPages,
      this.movieService
    );
    this.movieList.init();
  }

  async handleMoreClickButton(query: string | undefined) {
    const loadMoreButton = document.querySelector(".add-movie");
    if (!loadMoreButton) return;

    const newButton = loadMoreButton.cloneNode(true);
    loadMoreButton.parentNode?.replaceChild(newButton, loadMoreButton);

    newButton.addEventListener("click", async () => {
      await this.handleLoadMore();
    });
  }

  async handleLoadMore() {
    if (this.isLoadingMore) return; // 로딩 중이면 실행하지 않음
    this.isLoadingMore = true; // 로딩 시작

    const pageNumber = this.movieList?.currentPage + 1;
    this.movieList?.addPageNumber();

    const skeletonCards: HTMLElement[] = [];
    for (let i = 0; i < MOVIES_PER_ROW; i++) {
      const skeletonCard = new MovieCard(null).renderSkeleton();
      skeletonCards.push(skeletonCard);
      this.movieList?.container.appendChild(skeletonCard);
    }

    const query = store.getQuery();

    let newMoviesData: { movies: Movie[]; page: number; totalPages: number };
    setTimeout(async () => {
      if (store.getMode() === "popularAdd") {
        newMoviesData = await this.movieService.getPopularResults(pageNumber);
      } else {
        newMoviesData = await this.movieService.searchMovies(
          query ?? undefined,
          pageNumber
        );
      }

      skeletonCards.forEach((skeleton) => skeleton.remove());

      newMoviesData.movies.forEach((movieData) => {
        const movie = new Movie(movieData);
        const movieCard = new MovieCard(movie, this.movieService);
        this.movieList?.container.appendChild(movieCard.render());
      });

      if (
        this.movieList &&
        this.movieList.currentPage >= this.movieList.totalPage
      ) {
        const loadMoreButton = document.querySelector(".add-movie");
        loadMoreButton?.remove();
      }
      this.isLoadingMore = false; //로딩 끝
    }, 1000);
  }

  handleSearch(query: string) {
    if (!query.trim()) {
      this.initMovieList();
      return;
    }

    MovieList.removeMovieList();
    this.movieService.searchMovies(query).then((movies) => {
      this.movieList = new MovieList(
        ".thumbnail-list",
        movies,
        1,
        500,
        this.movieService
      );
      this.movieList.init();
      this.setupInfiniteScroll();
    });
  }

  handleLogoClick() {
    store.setMode("popularAdd");
    store.setQuery(null);
    this.initMovieList();
  }

  showHeader() {
    document.querySelector(".overlay")?.classList.remove("hide");
    document.querySelector(".top-rated-movie")?.classList.remove("hide");
    document
      .querySelector(".background-container")
      ?.classList.remove("hide-background");
  }

  setupInfiniteScroll() {
    window.addEventListener("scroll", async () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;

      const nearBottom = scrollTop + windowHeight >= bodyHeight - 200;

      if (
        nearBottom &&
        this.movieList &&
        this.movieList.currentPage < this.movieList.totalPage
      ) {
        await this.handleLoadMore();
      }
    });
  }
}
