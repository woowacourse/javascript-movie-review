import './resources.js';
import MovieHeader from './components/MovieHeader/MovieHeader';
import MovieList from './components/MovieList/MovieList.js';

const init = () => {
  MovieHeader.create();
  new MovieList();
};

init();
