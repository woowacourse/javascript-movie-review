import getPopularMovies from './api/getPopularMovies';
import { renderHeader } from './view/render/renderHeader';
import { renderBanner } from './view/render/renderBanner';
import { renderFooter } from './view/render/renderFooter';
import { renderMovieList } from './view/render/renderMovieList';

addEventListener('DOMContentLoaded', async () => {
  renderHeader();

  const params = {
    page: '1',
    language: 'ko-KR'
  };

  const movies = await getPopularMovies('/movie/popular', params);

  if (movies?.results.length > 0) {
    renderBanner(movies.results);
    renderMovieList(movies.results);
  }

  renderFooter();
});
