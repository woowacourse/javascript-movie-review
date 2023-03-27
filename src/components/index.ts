import Header from './Header';
import MoviesContainer from './MoviesContainer';
import SearchInput from './SearchInput';
import Button from './Button';
import MovieListItem from './MovieListItem';
import Skeleton from './Skeleton';
import Image from './Image';
import Modal from './Modal';
import MovieScore from './MovieScore';

customElements.define('movie-header', Header);
customElements.define('search-input', SearchInput);
customElements.define('movies-container', MoviesContainer);
customElements.define('movie-item', MovieListItem);
customElements.define('movie-modal', Modal);
customElements.define('movie-score', MovieScore);
customElements.define('movie-image', Image);
customElements.define('common-button', Button);
customElements.define('skeleton-item', Skeleton);
