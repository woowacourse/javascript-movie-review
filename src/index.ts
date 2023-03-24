import { api } from './api';
import './assets/common.css';
import { MovieList } from './components/MovieList';
import { SearchBox } from './components/SearchBox';
import { NewMovieSubject } from './states/domain/NewMovieSubject';
import { $ } from './utils/selector';

function assignMovieList(movieList: MovieList) {
  $('main').replaceChildren(movieList.getRoot());
}

assignMovieList(
  new MovieList({
    title: '지금 인기있는 영화',
    newMovie$: new NewMovieSubject((page) => api.getPopularMovies({ page })),
  }),
);

$('.logo').addEventListener('click', () => {
  assignMovieList(
    new MovieList({
      title: '지금 인기있는 영화',
      newMovie$: new NewMovieSubject((page) => api.getPopularMovies({ page })),
    }),
  );
});

$('header').append(new SearchBox().getRoot());

$('.search-box').addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
  const query = formData['search-text'] as string;

  assignMovieList(
    new MovieList({
      title: `"${query}" 검색결과`,
      newMovie$: new NewMovieSubject((page) => api.searchMovies({ query, page })),
    }),
  );
});
