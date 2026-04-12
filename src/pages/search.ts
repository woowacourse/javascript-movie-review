import { getSearchMovies } from "../api.ts";
import { MovieRenderer, Renderer } from "../render.ts";
import { INITIAL_PAGE_NUM } from "../constants/movie.ts";
import { MovieDetail } from "./movieDetail.ts";
import State from "../state.ts";

export const Search = {
  async showSearchMovies(query: string) {
    State.setIsLoading(true);
    Renderer.renderSkeleton(".thumbnail-list", State.getRequestMovieCount());
    try {
      const {
        results: movies,
        page,
        total_pages,
      } = await getSearchMovies(query, INITIAL_PAGE_NUM);
      MovieRenderer.renderSearchResult(movies, query);
      State.setNextSearchPageNum(page + 1);
      State.setTotalSearchPages(total_pages);
      State.setSearchQuery(query);
      MovieDetail.setUpMovieDetail(movies);
    } catch (err) {
      MovieRenderer.renderError(err);
    } finally {
      State.setIsLoading(false);
    }
  },

  async showMoreSearchMovies(query: string) {
    State.setIsLoading(true);
    Renderer.renderSkeleton(".thumbnail-list", State.getRequestMovieCount());
    try {
      const { results: movies, page } = await getSearchMovies(
        query,
        State.getNextSearchPageNum(),
      );
      State.setNextSearchPageNum(page + 1);
      MovieRenderer.renderLoadMoreSearchMovies(movies);
      MovieDetail.setUpMovieDetail(movies);
    } catch (err) {
      MovieRenderer.renderError(err);
    } finally {
      State.setIsLoading(false);
    }
  },
};
