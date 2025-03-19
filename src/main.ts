import getPopularMovies from './api/getPopularMovies';
import Button from './component/Button';
import Footer from './component/Footer';
import Header from './component/Header';
import Movie from './component/Movie';
import MovieList from './component/MovieList';
import { $ } from './util/selector';

addEventListener('load', async () => {
  renderHeader();
  renderMovieList();
  renderFooter();
});

const renderHeader = async () => {
  const { results: movies } = await getPopularMovies({ page: 1 });

  const wrap = $('#wrap');

  const header = Header({ movie: movies[1] });
  wrap?.prepend(header);
};

const renderMovieList = async () => {
  const { results: movies } = await getPopularMovies({ page: 1 });

  const container = $('.container');
  if (!container) return;

  const movieList = MovieList({ movies });
  const moreButton = Button({
    text: '더보기',
    onClick: handleMoreButtonClick
  });

  container.appendChild(movieList);
  container.appendChild(moreButton);
};

const handleMoreButtonClick = async () => {
  const container = $('.thumbnail-list') as HTMLElement;
  if (!container) return;

  const currentPage = Number(container.dataset.page || 1) + 1;
  container.dataset.page = String(currentPage);

  const { results: newMovies } = await getPopularMovies({ page: currentPage });

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
