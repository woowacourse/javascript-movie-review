import getPopularMovies from './api/getPopularMovies';
import Button from './component/Button';
import Footer from './component/Footer';
import Banner from './component/Banner';
import Movie from './component/Movie';
import MovieList from './component/MovieList';
import { $ } from './util/selector';
import Header from './component/Header';

const API_PAGE_LIMIT = 500;
const INITIAL_PAGE = 1;
const MOVIE_INDEX_FOR_BANNER = 1;

addEventListener('load', async () => {
  renderBanner();
  renderHeader();
  renderMovieList();
  renderFooter();
});

const renderBanner = async () => {
  const { results: movies } = await getPopularMovies({ page: INITIAL_PAGE });

  const wrap = $('#wrap');

  const banner = Banner({ movie: movies[MOVIE_INDEX_FOR_BANNER] });
  wrap?.prepend(banner);
};

const renderHeader = () => {
  const wrap = $('#wrap');

  const header = Header();
  wrap?.prepend(header);
};

const renderMovieList = async () => {
  let page = INITIAL_PAGE;
  const { results: movies } = await getPopularMovies({ page });

  const container = $('.container');
  if (!container) return;

  const movieList = MovieList({ movies, title: '지금 인기 있는 영화' });
  const moreButton = Button({
    text: '더보기',
    onClick: () => handleMoreButtonClick(++page, moreButton)
  });

  container.appendChild(movieList);
  container.appendChild(moreButton);
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

  const { results: newMovies } = await getPopularMovies({ page });

  const fragment = document.createDocumentFragment();

  newMovies.forEach((movie) => {
    const newMovie = Movie({ movie });
    fragment.appendChild(newMovie);
  });

  container.appendChild(fragment);
};
