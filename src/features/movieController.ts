import { Header } from "./View/Header";
import MovieList from "./View/MovieList";
import MovieDetailModal from "./View/MovieDetailModal.ts";
import { getMovies, getMovieDetail } from "./movieModel";
import { saveRating, getRating } from "./ratingModel";

const movieList = new MovieList();
const movieDetailModal = new MovieDetailModal();

const state = {
  page: 1,
  searchQuery: "",
  isLoading: false,
  hasMore: true,
  currentMovieId: 0,
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
    const data = await getMovies(state.page);
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

  state.isLoading = true;
  try {
    movieList.renderSkeleton();
    movieList.renderMainTitle(`"${query}" 검색 결과`);
    const data = await getMovies(state.page, state.searchQuery);
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
  } finally {
    state.isLoading = false;
  }
}

export async function loadMore(): Promise<void> {
  if (state.isLoading || !state.hasMore) return;

  state.isLoading = true;
  state.page += 1;
  movieList.appendSkeletons(20);
  try {
    const data = await getMovies(state.page, state.searchQuery);
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
  state.currentMovieId = id;
  try {
    const data = await getMovieDetail(id);
    const savedRating = getRating(id);
    movieDetailModal.render(data, savedRating);
  } catch (error) {
    if (error instanceof Error) movieDetailModal.renderError(error.message);
  }
}

export function closeMovieDetailModal() {
  movieDetailModal.close();
}

export function rateMovie(index: number) {
  saveRating(state.currentMovieId, index);
  movieDetailModal.rate(index);
}
