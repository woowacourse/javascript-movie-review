import {
  renderPopularMovieList,
  renderSearchMovieList,
  renderMoreMovieList,
} from '../components/MovieList';
import { $ } from '../utils';
import { getMovies, getSearchMovie, IMovieList } from './api';

type IPageStatus = 'popular' | 'search';

let moviePage: number = 1;

export function plusPage() {
  moviePage++;
}

export function resetPage() {
  moviePage = 1;
}
const movieList = [];
export async function usePopularMovie() {
  const popularMovieResponse = await getMovies(moviePage);
  const { page, results } = popularMovieResponse;
  movieList.push(results);

  function handlePageHeader() {
    const $pageHeader = $('.page-header') as HTMLElement;
    $pageHeader.innerText = '지금 인기 있는 영화';
  }

  function handlePopularResult() {
    //renderPopularMovieList();
  }

  function handleMoreMovieList() {
    renderMoreMovieList(results);
  }

  return {
    values: { page, results },
    handlers: { handlePageHeader, handlePopularResult: handlePopularResult, handleMoreMovieList },
  };
}

let recentKeyword: string;
export async function useSearchedMovie(keyword: string) {
  const { page, results } = await getSearchMovie(keyword, moviePage);
  recentKeyword = keyword;

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

let pageStatus: IPageStatus = 'popular';
export function togglePageStatus() {
  pageStatus = pageStatus === 'popular' ? 'search' : 'popular';
}

export function getPageStatus() {
  return pageStatus;
}

export function getRecentKeyword() {
  return recentKeyword;
}
