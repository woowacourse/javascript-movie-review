import { renderSearchMovieList, renderMoreMovieList } from '../components/MovieList';
import { $ } from '../utils';
import { getMovies, getSearchMovie } from '../api';

const movieList = [];

export async function usePopularMovie(requestedPage: number) {
  const popularMovieResponse = await getMovies(requestedPage);
  const { page, results } = popularMovieResponse;
  movieList.push(results);

  function handlePageHeader() {
    const $pageHeader = $('.page-header') as HTMLElement;
    $pageHeader.innerText = '지금 인기 있는 영화';
  }

  function handleMoreMovieList() {
    renderMoreMovieList(results);
  }

  return {
    values: { page, results },
    handlers: { handlePageHeader, handleMoreMovieList },
  };
}

export async function useSearchedMovie(keyword: string, requestedPage: number) {
  const { page, results } = await getSearchMovie(keyword, requestedPage);

  const $viewMoreButton = $('.view-more-button') as HTMLElement;
  $viewMoreButton.style.display = 'inline-block';

  if (results.length < 20) {
    $viewMoreButton.style.display = 'none';
  }

  function handlePageHeader() {
    const $pageHeader = $('.page-header') as HTMLElement;
    $pageHeader.innerText = `"${keyword}" 검색 결과`;
  }

  function handleSearchResult() {
    renderSearchMovieList(results);
  }

  function handleMoreMovieList() {
    renderMoreMovieList(results);
  }

  return {
    values: { page, results },
    handlers: { handlePageHeader, handleSearchResult, handleMoreMovieList },
  };
}
