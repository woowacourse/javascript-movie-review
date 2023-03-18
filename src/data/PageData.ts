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
  status.movieList.push(results);

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

function toggleMoreButton(result: IMovie[]) {
  const val = $('.view-more-button') as HTMLElement;

  if (result.length >= 20 && result.length > 0) return (val.style.display = 'inline-block');
  return (val.style.display = 'none');
}
