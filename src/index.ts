import './styles/reset.css';
import './styles/common.css';

import App from './App';
import { $ } from './utils/dom';
import { AppendMovieListEvent, DetailMovieEvent, UpdateMovieListEvent } from './types';

declare global {
  interface HTMLElementEventMap {
    updateMovieListEvent: UpdateMovieListEvent;
    appendMovieListEvent: AppendMovieListEvent;
    detailMovieEvent: DetailMovieEvent;
  }
}

new App($<HTMLDivElement>('#app'));
