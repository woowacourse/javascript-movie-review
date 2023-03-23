import '../assets/reset.css';
import '../assets/style.css';
import App from './App';
import { AppendMovieListEvent, UpdateMovieListEvent } from './types';

declare global {
  interface HTMLElementEventMap {
    updateMovieListEvent: UpdateMovieListEvent;
    appendMovieListEvent: AppendMovieListEvent;
  }
}

new App();
