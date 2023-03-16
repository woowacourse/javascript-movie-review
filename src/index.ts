import './styles/common.css';

import { render } from './utils/index';

import { App } from './components/App';
import { renderSkeletonList } from './components/MovieList';

render(App());

renderSkeletonList();
