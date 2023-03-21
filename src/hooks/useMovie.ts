import { renderSearchMovieList, renderMoreMovieList } from '../components/MovieList';
import { $ } from '../utils';
import { getMovies, getSearchMovie, IMovieList } from '../api';
import { PAGE_TITLE } from '../constants/constants';
/*
interface RequestedInfo {
  requestedPage: number;
  keyword?: string;
}

type Values = Pick<IMovieList, 'page' | 'results'>
interface Handlers {
  handlePageTitle: () => void;
  handleNextPage: () => void;
  handleSearchResult: () => void;
}
interface ResponseInfo {
  values: Values,
  handlers: {}
}
*/
// type TMovieFunction = (info: RequestedInfo) =>

export async function usePopularMovie(requestedPage: number) {
  const popularMovieResponse = await getMovies(requestedPage);
  const { page, results } = popularMovieResponse;

  async function handleNextPage() {
    const { results } = await getMovies(page + 1);
    return results;
  }

  return {
    values: { page, results },
    handlers: { handleNextPage },
  };
}

export async function useSearchedMovie(keyword: string, requestedPage: number) {
  const { page, results } = await getSearchMovie(keyword, requestedPage);

  const $viewMoreButton = $('.view-more-button') as HTMLElement;
  $viewMoreButton.style.display = 'inline-block';

  if (results.length < 20) {
    $viewMoreButton.style.display = 'none';
  }

  function handleSearchResult() {
    renderSearchMovieList(results);
  }

  function handleNextPage() {
    renderMoreMovieList(results);
  }

  return {
    values: { page, results },
    handlers: { handleSearchResult, handleNextPage },
  };
}
