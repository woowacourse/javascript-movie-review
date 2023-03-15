import './styles/common.css';
import './assets/logo.png';
import './assets/search_button.png';
import './assets/star_empty.png';
import './assets/star_filled.png';

import { renderSkeletonList } from './components/MovieList';
import { App } from './App';

new App(document.querySelector('#app'));

renderSkeletonList();
