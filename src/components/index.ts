import Header from './Header';
import SearchInput from './SearchInput';
import MoviesContainer from './MoviesContainer';
import MovieListItem from './MovieListItem';
import Modal from './Modal';
import MovieScore from './MovieScore';
import Image from './Image';
import Button from './Button';
import Skeleton from './Skeleton';

customElements.define('movie-header', Header);
customElements.define('search-input', SearchInput);
customElements.define('movies-container', MoviesContainer);
customElements.define('movie-item', MovieListItem);
customElements.define('movie-modal', Modal);
customElements.define('movie-score', MovieScore);
customElements.define('movie-image', Image);
customElements.define('common-button', Button);
customElements.define('skeleton-item', Skeleton);
