import { getMovies, searchMovies } from "../api/services/movie";
import { MoviesResponse } from "../api/types/movie/response";
import { handleApiResponse } from "../api/utils/handlers";
import Main from "../components/layout/Main";
import { store } from "../stores";
import InfiniteScroll from "./InfiniteScroll";
import {
  isLastPage,
  updateHeaderWithFirstMovie,
  updateMovieStore,
} from "./movieHelpers";

export default class MovieRenderer {
  private static instance: MovieRenderer;
  private infiniteScroll = InfiniteScroll.getInstance();
  private main = Main.getInstance();

  static getInstance(): MovieRenderer {
    if (!MovieRenderer.instance) MovieRenderer.instance = new MovieRenderer();
    return MovieRenderer.instance;
  }

  async renderMovies() {
    if (store.searchKeyword === "") await this.renderTotalList();
    else await this.renderSearchList();

    this.main.render();

    if (store.page === 1) this.infiniteScroll.initialize();
  }

  renderTotalList = async () => {
    const moviesResponse = await getMovies({ page: store.page });

    handleApiResponse<MoviesResponse>(moviesResponse, {
      onSuccess: (data) => {
        updateMovieStore(data);

        if (isLastPage()) this.infiniteScroll.setHasReachedEnd(true);

        updateHeaderWithFirstMovie();

        this.main.setState({
          movies: store.movies,
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
  };

  renderSearchList = async () => {
    updateHeaderWithFirstMovie();

    const moviesResponse = await searchMovies({
      page: store.page,
      title: store.searchKeyword,
    });

    handleApiResponse<MoviesResponse>(moviesResponse, {
      onSuccess: (data) => {
        updateMovieStore(data);

        if (isLastPage()) this.infiniteScroll.setHasReachedEnd(true);

        this.main.setState({
          movies: store.movies,
          isLoading: false,
          error: store.movies.length === 0 ? "검색 결과가 없습니다." : null,
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
  };
}
