import './resources.js';
import MovieHeader from './components/MovieHeader/MovieHeader';
import MovieList from './components/MovieList/MovieList';

const init = () => {
  MovieHeader.create();
  new MovieList();
};

init();
