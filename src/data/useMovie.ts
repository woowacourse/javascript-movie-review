import { renderSearchMovieList, renderMoreMovieList } from '../components/MovieList';
import { $ } from '../utils';
import { getMovies, getSearchMovie } from './api';
import { setRecentKeyword } from './useKeyword';
import { getPage } from './usePage';

const movieList = [];
export async function usePopularMovie() {
  const popularMovieResponse = await getMovies(getPage());
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

export async function useSearchedMovie(keyword: string) {
  const { page, results } = await getSearchMovie(keyword, getPage());

  setRecentKeyword(keyword);

  const val = $('.view-more-button') as HTMLElement;
  val.style.display = 'inline-block';

  if (results.length < 20) {
    val.style.display = 'none';
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
