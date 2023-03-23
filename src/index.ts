import './css/index.css';

import MovieHeader from './components/MovieHeader';
import MovieListSection from './components/MovieListSection';
import MovieListItem from './components/MovieListItem';
import CustomModal from './components/common/CustomModal';
import App from './App';

customElements.define('movie-header', MovieHeader);
customElements.define('movie-list-section', MovieListSection);
customElements.define('movie-list-item', MovieListItem);
customElements.define('custom-modal', CustomModal);
App.init();
