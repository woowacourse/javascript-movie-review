import getPopularMovies from './api/getPopularMovies';
import { addFooter } from './component/Footer';
import Banner, { addBanner } from './component/Banner';
import { addMoreMovieList, addMovieList, createObserverTarget } from './component/MovieList';
import { $ } from './util/selector';
import { addHeader } from './component/Header';
import { addBannerSkeleton, removeBannerSkeleton } from './component/Skeleton';
import { addSkeletonList, removeSkeletonList } from './component/SkeletonList';
import { INITIAL_PAGE, MOVIE_INDEX_FOR_BANNER, TOTAL_PAGES } from './constant';
import { createInfiniteScrollObserver } from './util/intersectionObserver';

addEventListener('DOMContentLoaded', async () => {
  renderBanner();
  renderHeader();
  renderMovieList();
  renderFooter();
});

const renderBanner = async () => {
  addBannerSkeleton();

  const response = await getPopularMovies({ page: 1 });

  removeBannerSkeleton();

  addBanner(Banner({ movie: response.results[MOVIE_INDEX_FOR_BANNER] }));
};

const renderHeader = () => {
  addHeader();
};

const renderMovieList = async () => {
  let currentPage = INITIAL_PAGE;
  const container = $('.container');
  if (!container) return;

  addSkeletonList(container);

  const response = await getPopularMovies({ page: currentPage });
  removeSkeletonList();

  addMovieList({ movies: response.results, title: '지금 인기있는 영화' });

  const newTarget = createObserverTarget();
  container.appendChild(newTarget);

  const observer = createInfiniteScrollObserver(newTarget, () => observeScroll(currentPage));
  if (currentPage >= TOTAL_PAGES) {
    observer.disconnect();
  }
};

const observeScroll = async (currentPage: number) => {
  let isFetching = false;
  const container = $('.container');
  if (!container) return;

  if (isFetching || currentPage >= TOTAL_PAGES) return;

  isFetching = true;

  currentPage++;
  addSkeletonList(container);

  const res = await getPopularMovies({ page: currentPage });

  removeSkeletonList();
  addMoreMovieList(res.results);

  isFetching = false;
};

const renderFooter = () => {
  addFooter();
};
