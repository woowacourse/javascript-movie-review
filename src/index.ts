import './assets/common.css';
import { MovieList } from './components/MovieList';
import MovieAPI, { TMDBGenres } from './MovieAPI';
import store from './store';

const popularFetchFn = (page: number) => MovieAPI.getPopularMovies(page);

function assignMovieList(movieList: MovieList) {
  document.querySelector('main')?.replaceChildren(movieList.render());
  (document.querySelector('.search-box') as HTMLFormElement).reset();
}

assignMovieList(new MovieList(popularFetchFn, '지금 인기있는 영화'));

document.querySelector('.logo')?.addEventListener('click', () => {
  assignMovieList(new MovieList(popularFetchFn, '지금 인기있는 영화'));
  store.initializeList();
});

document.querySelector('.search-box')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
  const query = formData['search-text'] as string;

  if (window.outerWidth <= 480 && !query) {
    document.querySelector('.search-box')?.classList.add('active');
  }
  if (window.outerWidth > 480 || query) {
    const searchFetchFn = (page: number) => MovieAPI.getSearchMovies(query, page);
    assignMovieList(new MovieList(searchFetchFn, `"${query}" 검색결과`));
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
