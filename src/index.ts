import './assets/common.css';
import client from './client';
import { MoviesLoader } from './MoviesLoader';

const fetchFn = (page: number) => client.getPopularMovies(page);

let moviesLoader = new MoviesLoader(fetchFn);

document.querySelector('.search-box')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
  const query = formData['search-text'] as string;

  moviesLoader = new MoviesLoader((page: number) => client.getSearchMovies(query, page));
});

document.querySelector('#item-load')?.addEventListener('click', (event) => {
  moviesLoader.nextPage();
});
