import { getMovies, searchMovies } from "../api/services/movie";
import { MoviesResponse } from "../api/types/movie/response";
import { handleApiResponse } from "../api/utils/handlers";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import { PREFIX_POSTER_PATH } from "../constants/constants";
import Movies from "./entities/Movies";
import Pagination from "./entities/Pagination";
import Search from "./entities/Search";
import InfiniteScroll from "./InfiniteScroll";

export default class MovieService {
  private static instance: MovieService;
  private main = Main.getInstance();
  private movies = Movies.getInstance();
  private pagination = Pagination.getInstance();
  private search = Search.getInstance();
  private infiniteScroll = new InfiniteScroll();

  static getInstance(): MovieService {
    if (!MovieService.instance) MovieService.instance = new MovieService();
    return MovieService.instance;
  }

  async renderMovies() {
    if (!this.search.hasSearchKeyword()) await this.renderTotalList();
    else await this.renderSearchList();

    this.main.render();

    if (this.pagination.isFirstPage()) this.infiniteScroll.initialize();
  }

  async renderTotalList() {
    const moviesResponse = await getMovies({
      page: this.pagination.currentPage,
    });

    handleApiResponse<MoviesResponse>(moviesResponse, {
      onSuccess: (data) => {
        this.updateFromResponse(data);

        if (this.pagination.hasReachedEnd())
          this.infiniteScroll.setHasReachedEnd(true);

        this.updateHeaderWithFirstMovie();

        this.main.setState({
          movies: this.movies.movies,
          isLoading: false,
        });
      },
      onError: (error) => {
        this.main.setState({
          isLoading: false,
          error: error,
        });
        this.infiniteScroll.setIsLoading(false);
      },
    });
  }

  async renderSearchList() {
    this.updateHeaderWithFirstMovie();

    const moviesResponse = await searchMovies({
      page: this.pagination.currentPage,
      title: this.search.searchKeyword,
    });

    handleApiResponse<MoviesResponse>(moviesResponse, {
      onSuccess: (data) => {
        this.updateFromResponse(data);

        if (this.pagination.hasReachedEnd())
          this.infiniteScroll.setHasReachedEnd(true);

        this.main.setState({
          movies: this.movies.movies,
          isLoading: false,
          error: this.movies.isEmpty() ? "검색 결과가 없습니다." : null,
        });
      },
      onError: (error) => {
        this.main.setState({
          isLoading: false,
          error: error,
        });
        this.infiniteScroll.setIsLoading(false);
      },
    });
  }

  updateHeaderWithFirstMovie() {
    const header = Header.getInstance();
    const firstMovieData = this.movies.getFirstMovie();

    if (!firstMovieData) return;

    header.setState({
      id: firstMovieData.id,
      posterImage: `${PREFIX_POSTER_PATH}${firstMovieData.poster_path}`,
      title: firstMovieData.title,
      voteAverage: firstMovieData.vote_average,
      isLoading: false,
    });
  }

  updateFromResponse(data: MoviesResponse) {
    this.movies.updateMovies(data);
    this.pagination.updateTotalPages(data.total_pages);
  }
}
