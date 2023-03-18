import {
  renderSearchMovieList,
  renderPopularMovieList,
  renderMoreMovieList,
} from '../components/MovieList';
import { $ } from '../utils';
import { getMovies, getSearchMovie, IMovie } from './api';

type IPageStatus = 'popular' | 'search';

interface statusInterface {
  moviePage: number;
  recentKeyword: string;
  pageStatus: IPageStatus;
  movieList: {}[];
}

const status: statusInterface = {
  moviePage: 1,
  recentKeyword: '',
  pageStatus: 'popular',
  movieList: [],
};

export const statusController = {
  plusPage() {
    status.moviePage++;
  },
  resetPage() {
    status.moviePage = 1;
  },
  changePageStatus() {
    status.pageStatus = status.pageStatus === 'popular' ? 'search' : 'popular';
  },
};

export const staterGetter = {
  getPageStatus() {
    return status.pageStatus;
  },
  getRecentKeyword() {
    return status.recentKeyword;
  },
};

export async function usePopularMovie() {
  const { page, results } = await getMovies(status.moviePage);
  status.movieList.push(results);

  function handlePopularResult() {
    renderPopularMovieList(results);
  }

  function handleMoreMovieList() {
    renderMoreMovieList(results);
  }

  return {
    values: { page, results },
    handlers: { changePageHeader, handlePopularResult: handlePopularResult, handleMoreMovieList },
  };
}

export async function useSearchedMovie(keyword: string) {
  const { page, results } = await getSearchMovie(keyword, status.moviePage);
  status.recentKeyword = keyword;

  toggleMoreButton(results);

  function handleSearchResult() {
    renderSearchMovieList(results);
  }

  function handleMoreMovieList() {
    renderMoreMovieList(results);
  }

  return {
    values: { page, results },
    handlers: { changePageHeader, handleSearchResult, handleMoreMovieList },
  };
}

function toggleMoreButton(result: IMovie[]) {
  const val = $('.view-more-button') as HTMLElement;

  if (result.length >= 20) return (val.style.display = 'inline-block');
  return (val.style.display = 'none');
}

function changePageHeader() {
  const $pageHeader = $('.page-header') as HTMLElement;

  let text = '지금 인기 있는 영화';
  if (status.pageStatus === 'popular') text = `"${status.recentKeyword}" 검색 결과`;

  $pageHeader.innerText = text;
}
