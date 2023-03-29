import { $ } from './utils/domHelper';
import '../reset.css';
import '../common.css';

import App from './App';
import Header from './components/Header';
import Title from './components/Title';
import MovieList from './components/MovieList';
import MovieItem from './components/MovieItem';
import DetailModal from './components/DetailModal';
import BackToTop from './components/BackToTop';

customElements.define('movie-header', Header);
customElements.define('movie-title', Title);
customElements.define('movie-list', MovieList);
customElements.define('movie-item', MovieItem);
customElements.define('detail-modal', DetailModal);
customElements.define('back-to-top', BackToTop);

new App($('#app'));
