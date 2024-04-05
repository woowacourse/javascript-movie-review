import './resources.js';
import MovieHeader from './components/MovieHeader/MovieHeader';
import MovieList from './components/MovieList/MovieList';
import { BUTTON } from './constants/INFORMATION';
import Button from './components/Button/Button';
import { getDomElement } from './util/DOM';

const init = () => {
  MovieHeader.create();
  new MovieList();
  getDomElement('#app').appendChild(
    Button.create(BUTTON.moveTop, () => {
      window.scrollTo(0, 0);
    }),
  );
};

init();
