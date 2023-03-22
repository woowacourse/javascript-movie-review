import { TMDBClient } from './api/clients/TMDBClient';
import { TMDBLanguage } from './api/clients/TMDBClient.type';
import './assets/common.css';
import { MovieList } from './components/MovieList';
import { NewMovie } from './states/NewMovie';
import { $ } from './utils/selector';

const client = new TMDBClient({
  apiKey: process.env.TMDB_API_KEY!,
  language: navigator.language as TMDBLanguage,
});

function assignMovieList(movieList: MovieList) {
  $('main').replaceChildren(movieList.getRoot());
}

assignMovieList(
  new MovieList({
    title: '지금 인기있는 영화',
    newMovie: new NewMovie((page) => client.getPopularMovies({ page })),
  }),
);

$('.logo').addEventListener('click', () => {
  assignMovieList(
    new MovieList({
      title: '지금 인기있는 영화',
      newMovie: new NewMovie((page) => client.getPopularMovies({ page })),
    }),
  );
});

$('.search-box').addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
  const query = formData['search-text'] as string;

  assignMovieList(
    new MovieList({
      title: `"${query}" 검색결과`,
      newMovie: new NewMovie((page) => client.searchMovies({ query, page })),
    }),
  );
});
