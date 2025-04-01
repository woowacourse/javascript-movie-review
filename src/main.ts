import { initMovies } from './domain/initMovies';
import { renderHeader } from './view/render/renderHeader';
import { renderBanner } from './view/render/renderBanner';
import { renderFooter } from './view/render/renderFooter';
import { renderMovieList } from './view/render/renderMovieList';
import { errorUi } from './view/errorUi';

addEventListener('DOMContentLoaded', async () => {
  try {
    const movies = await initMovies();

    renderHeader();

    if (movies.results.length > 0) {
      renderBanner(movies.results);
      renderMovieList(movies);
    }

    renderFooter();
  } catch (error) {
    if (error instanceof Error) {
      renderHeader();
      errorUi(error.message);
      renderFooter();
    }
  }
});
