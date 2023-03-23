import './css/index.css';

import MovieHeader from './components/MovieHeader';
import MovieListSection from './components/MovieListSection';
import MovieListItem from './components/MovieListItem';
import App from './App';

customElements.define('movie-header', MovieHeader);
customElements.define('movie-list-section', MovieListSection);
customElements.define('movie-list-item', MovieListItem);
App.init();
