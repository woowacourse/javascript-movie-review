import { $ } from './utils/domHelper';
import '../templates/reset.css';
import '../templates/common.css';

import App from './App';
import Header from './components/Header';
import MovieList from './components/MovieList';
import SeeMore from './components/SeeMore';
import Title from './components/Title';

customElements.define('movie-header', Header);
customElements.define('movie-title', Title);
customElements.define('movie-list', MovieList);
customElements.define('movie-see-more', SeeMore);

new App($('#app'));
