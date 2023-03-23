import { $ } from './utils/domHelper';
import '../templates/reset.css';
import '../templates/common.css';

import App from './App';
import Header from './components/Header';
import Title from './components/Title';
import MovieList from './components/MovieList';
import MovieItem from './components/MovieItem';
import SkeletonItem from './components/SkeletonItem';
import DetailModal from './components/DetailModal';

customElements.define('movie-header', Header);
customElements.define('movie-title', Title);
customElements.define('movie-list', MovieList);
customElements.define('movie-item', MovieItem);
customElements.define('skeleton-item', SkeletonItem);
customElements.define('detail-modal', DetailModal);

new App($('#app'));
