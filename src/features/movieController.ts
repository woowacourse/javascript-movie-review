import { Header } from "./View/Header";
import MovieList from "./View/MovieList";
import { getMoreMovies, getPopularMovies, getSearchMovies } from "./movieModel";

const movieList = new MovieList();

export async function initialRender(page: number): Promise<void> {
  try {
    Header.clearSearchInput();
    movieList.renderMainTitle("지금 인기 있는 영화");

    movieList.renderSkeleton();
    const data = await getPopularMovies(page);
    Header.clearHeader();
    Header.render(data.results[0]);
    movieList.clearList();
    movieList.renderMovieList(data);
    movieList.updateMoreButton(data.total_pages, page);
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}

export async function renderSearchResults(
  page: number,
  searchQuery: string,
): Promise<void> {
  try {
    movieList.renderSkeleton();
    movieList.renderMainTitle(`"${searchQuery}" 검색 결과`);

    const data = await getSearchMovies(page, searchQuery);
    Header.clearHeader();
    Header.renderSearch();

    if (data.results.length === 0) {
      movieList.showEmpty();
    } else {
      movieList.clearList();
      movieList.renderMovieList(data);
    }

    movieList.updateMoreButton(data.total_pages, page);
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}

export async function renderMoreMovies(
  page: number,
  searchQuery: string,
): Promise<void> {
  try {
    const data = await getMoreMovies(page, searchQuery);
    movieList.renderMovieList(data);
    movieList.updateMoreButton(data.total_pages, page);
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}
