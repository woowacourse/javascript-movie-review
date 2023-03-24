import './assets/common.css';
import Header from './components/Header';
import Modal from './components/Modal';
import { MovieList } from './components/MovieList';
import { POPULAR_MOVIES, SEARCH_RESULT } from './constants';
import MovieAPI, { TMDBGenres } from './MovieAPI';
import store from './store';

const init = () => {
  const modal = new Modal();
  const header = new Header();
  header.render();
  modal.init();
};

init();

const popularFetchFn = (page: number) => MovieAPI.getPopularMovies(page);

function assignMovieList(movieList: MovieList) {
  document.querySelector('main')?.replaceChildren(movieList.render());
  (document.querySelector('.search-box') as HTMLFormElement).reset();
}

assignMovieList(new MovieList(popularFetchFn, POPULAR_MOVIES));

document.querySelector('.logo')?.addEventListener('click', () => {
  assignMovieList(new MovieList(popularFetchFn, POPULAR_MOVIES));
  store.initializeList();
});

document.querySelector('.search-box')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
  const query = formData['search-text'] as string;

  if (window.outerWidth <= 480 && !query) {
    document.querySelector('.search-box')?.classList.add('active');
  }
  if ((window.outerWidth > 480 && query) || query) {
    const searchFetchFn = (page: number) => MovieAPI.getSearchMovies(query, page);
    assignMovieList(new MovieList(searchFetchFn, SEARCH_RESULT(query)));
  }
});

document.querySelector('.search-box')?.addEventListener('mouseleave', () => {
  document.querySelector('.search-box')?.classList.remove('active');
});

const response: Promise<TMDBGenres> = MovieAPI.getGenreList();

response.then((res) => {
  res.genres.forEach((genre) => {
    store.setGenres(genre.id, genre.name);
  });
});

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

document.querySelector('.scroll-to-top')?.addEventListener('click', scrollToTop);

window.onload = () => {
  setTimeout(() => {
    scrollToTop();
  }, 100);
};
