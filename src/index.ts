import './styles/common.css';
import './assets/logo.png';
import './assets/search_button.png';
import './assets/star_empty.png';
import './assets/star_filled.png';

import { render } from './utils/index';

import { App } from './components/App';
import { renderSkeletonList } from './components/MovieList';
import { publisher } from './store/publisher';

const state = new publisher({
  page: 1,
  keyword: '',
  isPopular: true,
});

render(App(state));

renderSkeletonList(state);
