import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import { MovieItem } from './components/MovieItem';
import { Skeleton } from './components/Skeleton';
import { Modal } from './components/Modal';
import { ModalInformation } from './ModalInformation';
import App from './App';

import '../reset.css';
import '../common.css';

customElements.define('movie-header', Header);
customElements.define('movie-list', MovieList);
customElements.define('movie-item', MovieItem);
customElements.define('movie-skeleton', Skeleton);
customElements.define('movie-modal', Modal);
customElements.define('movie-information', ModalInformation);

const app = new App();
