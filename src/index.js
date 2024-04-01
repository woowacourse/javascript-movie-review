import './reset.css';
import './common.css';
import MovieApp from './MovieApp';
import DUMMY from './constants/dummy';

localStorage.setItem('ratings', JSON.stringify(DUMMY));

new MovieApp();

