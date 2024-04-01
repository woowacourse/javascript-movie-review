import './reset.css';
import './app.css';

import Header from './components/Header/Header';
import MovieItems from './components/MovieItems/MovieItems';
import Fallback from './components/Fallback/Fallback';
import MovieDetailModal from './components/MovieDetailModal/MovieDetailModal';

import { MatchedMoviesService, PopularMoviesService } from './services/MovieService';

import MovieGenresCollection from './domain/MovieGenresCollection';

import FloatingButton from './imgs/floating_button.svg';

class MovieApp {
  private body = document.querySelector('body') as HTMLBodyElement;
  private header = new Header();
  private movieItems = new MovieItems();
  private movieDetailModal = new MovieDetailModal();

  constructor() {
    this.createElements();
    this.setEventListener();
    MovieGenresCollection.initialize();
  }

  createElements() {
    this.body.appendChild(this.header.getElement());
    this.body.appendChild(this.movieItems.getElement());
    this.body.appendChild(this.movieDetailModal.getElement());
    this.body.appendChild(this.createFloatingButton());
  }

  createFloatingButton() {
    const button = document.createElement('button');
    const image = document.createElement('img');
    image.src = FloatingButton;
    image.classList.add('floating-button-image');
    button.appendChild(image);
    button.classList.add('floating-button');
    button.addEventListener('click', () => {
      window.scrollTo(0, 0);
    });

    return button;
  }

  setEventListener() {
    this.setGetPopularMoviesEventListener();
    this.setGetMatchedMoviesEventListener();
    this.setAPIErrorEventListener();
    this.setToggleMovieDetailModalEventListener();
  }

  setGetPopularMoviesEventListener() {
    document.addEventListener('GetPopularMovies', () => {
      this.movieItems.moviesService = new PopularMoviesService();

      this.reLoad();
    });
  }

  setGetMatchedMoviesEventListener() {
    document.addEventListener('GetMatchedMovies', (event) => {
      if (!(event instanceof CustomEvent)) return;
      const { query } = event.detail;

      this.movieItems.moviesService = new MatchedMoviesService(query);
      this.reLoad();
    });
  }

  setAPIErrorEventListener() {
    document.addEventListener('APIError', (event) => {
      if (!(event instanceof CustomEvent)) return;
      const main = this.body.querySelector('.item-view') as HTMLElement;
      main.innerHTML = '';
      main.appendChild(new Fallback(event.detail.message).getElement());
    });
  }

  setToggleMovieDetailModalEventListener() {
    document.addEventListener('toggleMovieDetailModal', (event) => {
      if (!(event instanceof CustomEvent)) return;
      this.movieDetailModal.setMovieDetail(event.detail.value);
      this.movieDetailModal.toggleModal();
    });
  }

  reLoad() {
    const fallback = this.body.querySelector('.fallback');
    if (fallback) {
      fallback.remove();
      this.movieItems.createTemplate();
    }
    this.movieItems.resetMovieItems();
  }
}

export default MovieApp;
