import './assets/common.css';
import { MovieList } from './components/MovieList';
import MovieAPI from './MovieAPI';

const popularFetchFn = (page: number) => MovieAPI.getPopularMovies(page);

function assignMovieList(movieList: MovieList) {
  document.querySelector('main')?.replaceChildren(movieList.render());
}

assignMovieList(new MovieList(popularFetchFn, '지금 인기있는 영화'));

document.querySelector('.logo')?.addEventListener('click', (event) => {
  assignMovieList(new MovieList(popularFetchFn, '지금 인기있는 영화'));
});

document.querySelector('.search-box')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
  const query = formData['search-text'] as string;

  const searchFetchFn = (page: number) => MovieAPI.getSearchMovies(query, page);
  assignMovieList(new MovieList(searchFetchFn, `"${query}" 검색결과`));
});
