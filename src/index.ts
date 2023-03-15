import './assets/common.css';
import { MoviesLoader } from './MoviesLoader';

const getPopularMoviesURL = (page: number) =>
  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ko-KR&page=${page}`;

const getSearchMoviesURL = (query: string) => (page: number) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=ko-KR&query=${query}&page=${page}&include_adult=false`;

let moviesLoader = new MoviesLoader(getPopularMoviesURL);

document.querySelector('.search-box')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
  const query = formData['search-text'] as string;

  moviesLoader = new MoviesLoader(getSearchMoviesURL(query));
});

document.querySelector('#item-load')?.addEventListener('click', (event) => {
  moviesLoader.nextPage();
});
