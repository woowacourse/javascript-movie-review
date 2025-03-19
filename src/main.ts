import getPopularMovies from './api/getPopularMovies';
import Button from './component/Button';
import Footer from './component/Footer';
import Banner from './component/Banner';
import Movie from './component/Movie';
import MovieList from './component/MovieList';
import { $ } from './util/selector';
import Header from './component/Header';

addEventListener('load', async () => {
  renderBanner();
  renderHeader();
  renderMovieList();
  renderFooter();
});

const renderBanner = async () => {
  const { results: movies } = await getPopularMovies({ page: 1 });

  const wrap = $('#wrap');

  const banner = Banner({ movie: movies[1] });
  wrap?.prepend(banner);
};

const renderHeader = () => {
  const wrap = $('#wrap');

  const header = Header();
  wrap?.prepend(header);
};

const renderMovieList = async () => {
  let page = 1;
  const { results: movies } = await getPopularMovies({ page });

  const container = $('.container');
  if (!container) return;

  const movieList = MovieList({ movies });
  const moreButton = Button({
    text: '더보기',
    onClick: () => handleMoreButtonClick(page, moreButton)
  });

  container.appendChild(movieList);
  container.appendChild(moreButton);
};

const handleMoreButtonClick = async (page: number, moreButton: HTMLElement) => {
  if (page === 499) {
    moreButton.remove();
  }
  const container = $('.thumbnail-list') as HTMLElement;
  if (!container) return;

  const { results: newMovies } = await getPopularMovies({ page: page + 1 });

  const fragment = document.createDocumentFragment();

  newMovies.forEach((movie) => {
    const newMovie = Movie({ movie });
    fragment.appendChild(newMovie);
  });

  container.appendChild(fragment);
};

const renderFooter = () => {
  const wrap = $('#wrap');
  if (!wrap) return;

  const footer = Footer();
  wrap.appendChild(footer);
};
