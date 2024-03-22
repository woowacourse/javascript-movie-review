import './resources.js';
import MovieHeader from './components/MovieHeader/MovieHeader';
import ItemView from './components/ItemView/ItemView';

const init = () => {
  MovieHeader.create();
  new ItemView();
};

init();
