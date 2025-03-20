import Movie from "../../domain/models/Movie.js";
import MovieList from "../components/MovieList.js";
import MovieService from "../../domain/services/MovieService.js";
import MovieCard from "../components/Movie.js";
import { store } from "../../store/store.js";
import { ApiResponse, MovieResponse } from "../../types/types.js";

export default class MovieListHandler {
  private movieList: MovieList | undefined;
  private movieService: MovieService;

  constructor(movieService: MovieService) {
    this.movieService = movieService;
  }

  async initMovieList(query?: string) {
    const moviesData = query
      ? await this.movieService.searchMovies(query, 1)
      : await this.movieService.getPopularResults();

    this.updateMovieList(moviesData);
    this.handleMoreClickButton(query);
    this.movieList?.updateMovieListTitle(query);
    console.log(this.movieList?.currentPage);
    console.log(this.movieList?.totalPage);
  }

  private updateMovieList(moviesData: ApiResponse<MovieResponse>) {
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
      await this.handleLoadMore(query);
    });
  }

  async handleLoadMore(query: string | undefined) {
    const pageNumber = this.movieList?.currentPage + 1;
    this.movieList?.addPageNumber();
    console.log(`pageNumber: ${pageNumber}`);

    const skeletonCards: HTMLElement[] = [];
    for (let i = 0; i < 5; i++) {
      const skeletonCard = new MovieCard(null).renderSkeleton();
      skeletonCards.push(skeletonCard);
      this.movieList?.container.appendChild(skeletonCard);
    }

    let newMoviesData: { movies: Movie[]; page: number; totalPages: number };
    setTimeout(async () => {
      if (store.getMode() === "popularAdd") {
        newMoviesData = await this.movieService.getPopularResults(pageNumber);
      } else {
        newMoviesData = await this.movieService.searchMovies(query, pageNumber);
      }

      skeletonCards.forEach((skeleton) => skeleton.remove());

      newMoviesData.movies.forEach((movieData) => {
        const movie = new Movie(movieData);
        const movieCard = new MovieCard(movie);
        this.movieList?.container.appendChild(movieCard.render());
      });

      if (
        this.movieList &&
        this.movieList.currentPage >= this.movieList.totalPage
      ) {
        console.log("remove load more button");
        const loadMoreButton = document.querySelector(".add-movie");
        loadMoreButton?.remove();
      }
    }, 1000);
  }

  handleSearch(query: string) {
    if (!query.trim()) {
      this.initMovieList();
      return;
    }

    MovieList.removeMovieList();
    this.movieService.searchMovies(query).then((movies) => {
      this.movieList = new MovieList(".thumbnail-list", movies, 1, 500, this.movieService);
      this.movieList.init();
    });
  }

  handleLogoClick() {
    this.initMovieList();
  }
}
