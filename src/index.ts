import './reset.css';
import './app.css';

import Header from './components/Header/Header';
import MovieItems from './components/MovieItems/MovieItems';
import { MatchedMoviesService, PopularMoviesService } from './services/MovieService';
import Fallback from './components/Fallback/Fallback';

const body = document.querySelector('body');

const header = new Header();
const movieItems = new MovieItems();

body?.appendChild(header.getElement());
body?.appendChild(movieItems.getElement());

document.addEventListener('GetPopularMovies', () => {
  movieItems.moviesService = new PopularMoviesService();
  reLoad();
});

document.addEventListener('GetMatchedMovies', (event) => {
  if (!(event instanceof CustomEvent)) return;
  const { query } = event.detail;

  movieItems.moviesService = new MatchedMoviesService(query);
  reLoad();
});

document.addEventListener('APIError', (event) => {
  if (!(event instanceof CustomEvent)) return;
  const main = body?.querySelector('main') as HTMLElement;
  main.innerHTML = '';
  main?.appendChild(new Fallback(event.detail.message).getElement());
});

const reLoad = () => {
  const fallback = body?.querySelector('section');
  console.log(fallback);
  if (fallback) {
    fallback.remove();
    movieItems.createElements();
  }
  movieItems.resetMovieItems();
  movieItems.fetchMovieItems();
};
