import './reset.css';
import './app.css';

import Header from './components/Header/Header';
import MovieItems from './components/MovieItems/MovieItems';

const body = document.querySelector('body');

const header = new Header();
const movieItems = new MovieItems();

body?.appendChild(header.getElement());
body?.appendChild(movieItems.getElement());

document.addEventListener('GetPopularMovies', () => {
  movieItems.resetMovieItems();
  movieItems.showMore();
});

document.addEventListener('GetMatchedMovies', (event) => {
  if (!(event instanceof CustomEvent)) return;
  const { query } = event.detail;

  movieItems.resetMovieItems(query);
  movieItems.showMore();
});
