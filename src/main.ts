import getPopularMovies from './api/getPopularMovies';
import { addFooter } from './component/Footer';
import Banner, { addBanner } from './component/Banner';
import { addMovieList } from './component/MovieList';
import { $ } from './util/selector';
import { addHeader } from './component/Header';
import { addBannerSkeleton, removeBannerSkeleton } from './component/Skeleton';
import { addSkeletonList, removeSkeletonList } from './component/SkeletonList';
import MoreButton from './component/MoreButton';
import { INITIAL_PAGE, MOVIE_INDEX_FOR_BANNER, TOTAL_PAGES } from './constant';

addEventListener('DOMContentLoaded', async () => {
  renderBanner();
  renderHeader();
  renderMovieList();
  renderFooter();
});

const renderBanner = async () => {
  addBannerSkeleton();

  const response = await getPopularMovies({ page: 1 });
  if (!response || response.results.length === 0) return;

  removeBannerSkeleton();

  addBanner(Banner({ movie: response.results[MOVIE_INDEX_FOR_BANNER] }));
};

const renderHeader = () => {
  addHeader();
};

const renderMovieList = async () => {
  const container = $('.container');
  if (!container) return;

  addSkeletonList(container);

  const response = await getPopularMovies({ page: INITIAL_PAGE });

  removeSkeletonList();

  if (!response || response.results.length === 0) return;

  addMovieList({ movies: response.results, title: '지금 인기있는 영화' });

  const moreButton = MoreButton({
    totalPages: TOTAL_PAGES,
    fetchMovies: getPopularMovies,
    fetchArgs: {}
  });

  container.appendChild(moreButton);
};

const renderFooter = () => {
  addFooter();
};
