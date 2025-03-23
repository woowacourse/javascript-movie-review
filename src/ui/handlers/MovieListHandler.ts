import Movie from "../../domain/models/Movie.js";
import MovieList from "../components/MovieList.js";
import MovieService from "../../domain/services/MovieService.js";
import MovieCard from "../components/Movie.js";
import { store } from "../../store/store.js";
import { APIResponse, MovieResponse } from "../../api/tmdbApi.js";

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
  }

  private updateMovieList(moviesData: APIResponse<MovieResponse>) {
    MovieList.removeMovieList();
    this.movieList = new MovieList(
      ".thumbnail-list",
      moviesData.results.map(movie => new Movie({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path || "",
        voteAverage: movie.vote_average,
      })),
      moviesData.page,
      moviesData.total_pages,
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

    Array.from({ length: 5 }).forEach(() => {
      const skeletonCard = new MovieCard(null).renderSkeleton();
      this.movieList?.container.appendChild(skeletonCard);
    });

    let newMoviesData: APIResponse<MovieResponse>;
    setTimeout(async () => {
      if (store.getMode() === "popularAdd") {
        newMoviesData = await this.movieService.getPopularResults(pageNumber);
      } else {
        newMoviesData = await this.movieService.searchMovies(query, pageNumber);
      }

      this.movieList?.container.querySelectorAll(".skeleton-card").forEach((skeleton) => skeleton.remove());

      newMoviesData.results.forEach((movieData) => {
        const movie = new Movie({
          id: movieData.id,
          title: movieData.title,
          posterPath: movieData.poster_path || "",
          voteAverage: movieData.vote_average,
        });
        const movieCard = new MovieCard(movie);
        this.movieList?.container.appendChild(movieCard.render());
      });

      if (
        this.movieList &&
        this.movieList.currentPage >= this.movieList.totalPage
      ) {
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
