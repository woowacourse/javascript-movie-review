import { $ } from '../utils';
import { getMovies, getSearchMovie, MovieInterface } from './api';
import { Validation, renderError } from '../Validation';

type PageStatusType = 'popular' | 'search';

interface statusInterface {
  moviePage: number;
  recentKeyword: string;
  pageStatus: PageStatusType;
}

const status: statusInterface = {
  moviePage: 1,
  recentKeyword: '',
  pageStatus: 'popular',
};

export const statusController = {
  plusPage() {
    status.moviePage++;
  },
  resetPage() {
    status.moviePage = 1;
  },
  changePageStatus(callPage: PageStatusType) {
    status.pageStatus = callPage;
  },
};

export const stateGetter = {
  getPageStatus() {
    return status.pageStatus;
  },
  getRecentKeyword() {
    return status.recentKeyword;
  },
};

export async function usePopularMovie() {
  const { page, results } = await getMovies(status.moviePage);

  toggleMoreButton(results);

  return {
    values: { page, results },
  };
}

export async function useSearchedMovie(keyword: string) {
  const { page, results } = await getSearchMovie(keyword, status.moviePage);
  status.recentKeyword = keyword;

  toggleMoreButton(results);

  return {
    values: { page, results },
  };
}

function toggleMoreButton(result: MovieInterface[]) {
  const moreButton = $('.view-more-button') as HTMLElement;

  if (result.length >= 20 && result.length > 0) return (moreButton.style.display = 'inline-block');
  return (moreButton.style.display = 'none');
}
