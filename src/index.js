import { Header } from './components/Header';
import './assets/logo.png';
import '../reset.css';
import { MovieList } from './components/MovieList';

customElements.define('movie-header', Header);
customElements.define('movie-list', MovieList);
