import './reset.css';
import './app.css';

import Header from './components/Header/Header';
import MovieItems from './components/MovieItems/MovieItems';

const body = document.querySelector('body');

const getPopularMovies = () => {
  movieItems.resetMovieItems();
  movieItems.showMore();
};

const getMatchedMovies = (event: SubmitEvent) => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const searchKeyword = Array.from(formData.values())[0];

  movieItems.resetMovieItems(searchKeyword.toString());
  movieItems.showMore();
};

const header = new Header({ onLogoClick: getPopularMovies, onSearch: getMatchedMovies });
const movieItems = new MovieItems();

body?.appendChild(header.element);
body?.appendChild(movieItems.element);
