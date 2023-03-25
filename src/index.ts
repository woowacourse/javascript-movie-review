import { api } from './api';
import './assets/common.css';
import { MovieList } from './components/MovieList';
import { SearchBox } from './components/SearchBox';
import { currentMovies$ } from './states';
import { MoviesSubject } from './states/domain/MoviesSubject';
import { $ } from './utils/selector';

currentMovies$.subscribe(({ title, movies$ }) => {
  $('main').replaceChildren(new MovieList({ title, movies$ }).getRoot());
});

currentMovies$.next({
  title: '지금 인기있는 영화',
  movies$: new MoviesSubject((page) => api.getPopularMovies({ page })),
});

$('.logo').addEventListener('click', () => {
  currentMovies$.next({
    title: '지금 인기있는 영화',
    movies$: new MoviesSubject((page) => api.getPopularMovies({ page })),
  });
});

$('header').append(new SearchBox().getRoot());

$('.search-box').addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
  const query = formData['search-text'] as string;

  currentMovies$.next({
    title: `"${query}" 검색결과`,
    movies$: new MoviesSubject((page) => api.searchMovies({ query, page })),
  });
});
