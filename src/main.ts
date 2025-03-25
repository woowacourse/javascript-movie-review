import getPopularMovies from './api/getPopularMovies';
import Button from './component/Button';
import Footer from './component/Footer';
import Banner from './component/Banner';
import Movie from './component/Movie';
import MovieList from './component/MovieList';
import { $ } from './util/selector';
import Header from './component/Header';
import Skeleton from './component/Skeleton';
import SkeletonList, { addSkeletonList, removeSkeletonList } from './component/SkeletonList';
import { IMovie } from './type';

const API_PAGE_LIMIT = 500;
const INITIAL_PAGE = 1;
const MOVIE_INDEX_FOR_BANNER = 1;

addEventListener('DOMContentLoaded', async () => {
  renderBanner();
  renderHeader();
  renderMovieList();
  renderFooter();
});

const renderBanner = async () => {
  const wrap = $('#wrap');

  const bannerSkeleton = Skeleton({ height: 500 });
  wrap?.prepend(bannerSkeleton);

  const response = await getPopularMovies({ page: 1 });
  if (!response) return;
  const movies = response.results;

  if (movies.length !== 0) {
    const banner = Banner({ movie: movies[MOVIE_INDEX_FOR_BANNER] });
    bannerSkeleton?.replaceWith(banner);
  }
};

const renderHeader = () => {
  const wrap = $('#wrap');

  const header = Header();
  wrap?.prepend(header);
};

const renderMovieList = async () => {
  const container = $('.container');
  if (!container) return;

  addSkeletonList();
  let page = INITIAL_PAGE;

  const response = await getPopularMovies({ page });
  if (!response) return;

  const movies = response.results;

  if (movies.length !== 0) {
    const movieList = MovieList({ movies, title: '지금 인기 있는 영화' });

    const moreButton = Button({
      text: '더보기',
      id: 'moreButton',
      onClick: () => handleMoreButtonClick(++page, moreButton)
    });

    removeSkeletonList();
    container.appendChild(movieList);
    container.appendChild(moreButton);
  }
};

const renderFooter = () => {
  const wrap = $('#wrap');
  if (!wrap) return;

  const footer = Footer();
  wrap.appendChild(footer);
};

const handleMoreButtonClick = async (page: number, moreButton: HTMLElement) => {
  if (page >= API_PAGE_LIMIT - 1) {
    moreButton.remove();
  }

  const container = $('.thumbnail-list') as HTMLElement;
  if (!container) return;

  const skeletonList = SkeletonList({ height: 300 });
  container.appendChild(skeletonList);

  const response = await getPopularMovies({ page });
  if (!response) return;

  renderMoreMovies(response.results, container, skeletonList);
};

const renderMoreMovies = (newMovies: IMovie[], container: HTMLElement, skeletonList: HTMLElement) => {
  skeletonList.remove();

  const fragment = document.createDocumentFragment();

  newMovies.forEach((movie) => {
    const newMovie = Movie({ movie });
    fragment.appendChild(newMovie);
  });

  container.appendChild(fragment);
};
