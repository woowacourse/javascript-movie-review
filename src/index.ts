import '../assets/reset.css';
import '../assets/style.css';
import App from './App';
import { AppendMovieListEvent, ClickMovieEvent, UpdateMovieListEvent } from './types';

declare global {
  interface HTMLElementEventMap {
    updateMovieListEvent: UpdateMovieListEvent;
    appendMovieListEvent: AppendMovieListEvent;
    clickMovieEvent: ClickMovieEvent;
  }
}

new App();
