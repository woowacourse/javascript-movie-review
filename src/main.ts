import { initMovies } from './domain/initMovies';
import { renderHeader } from './view/render/renderHeader';
import { renderBanner } from './view/render/renderBanner';
import { renderFooter } from './view/render/renderFooter';
import { renderMovieList } from './view/render/renderMovieList';

addEventListener('DOMContentLoaded', async () => {
  const movies = await initMovies();

  renderHeader();

  if (movies?.results.length > 0) {
    renderBanner(movies.results);
    renderMovieList(movies);
  }

  renderFooter();
});
