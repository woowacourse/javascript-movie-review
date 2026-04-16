import { Header } from "./View/Header";
import MovieList from "./View/MovieList";
import MovieDetailModal from "./View/MovieDetailModal.ts";
import {
  getMoreMovies,
  getPopularMovies,
  getSearchMovies,
  getMovieDetail,
} from "./movieModel";

const movieList = new MovieList();
const movieDetailModal = new MovieDetailModal();

const state = {
  page: 1,
  searchQuery: "",
  isLoading: false,
  hasMore: true,
  reset() {
    this.page = 1;
    this.searchQuery = "";
    this.isLoading = false;
    this.hasMore = true;
  },
};

export async function initialRender(): Promise<void> {
  state.reset();
  try {
    Header.clearSearchInput();
    movieList.renderMainTitle("지금 인기 있는 영화");
    movieList.renderSkeleton();
    const data = await getPopularMovies(state.page);
    Header.clearHeader();
    Header.render(data.results[0]);
    movieList.clearList();
    movieList.renderMovieList(data);
    state.hasMore = state.page < data.total_pages;
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}

export async function searchMovies(query: string): Promise<void> {
  state.page = 1;
  state.searchQuery = query;

  if (query === "") {
    await initialRender();
    return;
  }

  try {
    movieList.renderSkeleton();
    movieList.renderMainTitle(`"${query}" 검색 결과`);
    const data = await getSearchMovies(state.page, state.searchQuery);
    Header.clearHeader();
    Header.renderSearch();

    if (data.results.length === 0) {
      movieList.showEmpty();
      state.hasMore = false;
    } else {
      movieList.clearList();
      movieList.renderMovieList(data);
      state.hasMore = state.page < data.total_pages;
    }
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}

export async function loadMore(): Promise<void> {
  if (state.isLoading || !state.hasMore) return;

  state.isLoading = true;
  state.page += 1;
  movieList.appendSkeletons(20);
  try {
    const data = await getMoreMovies(state.page, state.searchQuery);
    movieList.removeSkeletons();
    movieList.renderMovieList(data);
    state.hasMore = state.page < data.total_pages;
  } catch (error) {
    movieList.removeSkeletons();
    if (error instanceof Error) movieList.renderError(error.message);
  } finally {
    state.isLoading = false;
  }
}

export async function renderMovieDetailModal(id: number) {
  try {
    movieDetailModal.reset();
    const data = await getMovieDetail(id);
    movieDetailModal.render(data);
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}

export function closeMovieDetailModal() {
  movieDetailModal.close();
}
