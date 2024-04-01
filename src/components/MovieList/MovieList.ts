import MovieItem from '../MovieItem/MovieItem';
import MovieDetailModal from '../Modal/MovieDetailModal';
import Skeleton from '../Skeleton/Skeleton';
import { NotFound } from '../NotFound/NotFound';
import { Movie } from './../../types/movie';
import { PAGE_SIZE } from '../../consts/common';
import { MovieDetailAPI } from '../../domain/services/API.type';
import '../MovieList/MovieList.css';

class MovieList {
  movieListBox = document.createElement('ul');
  movieDetailModal = new MovieDetailModal();

  constructor() {
    this.movieListBox.classList.add('item-list');
    this.mount();

    this.renderSkeleton();
  }

  mount() {
    const itemViewBox = document.querySelector('.item-view');
    if (!itemViewBox) return;
    itemViewBox.append(this.movieListBox);
  }

  renderSkeleton() {
    const fragment = new DocumentFragment();

    Array.from({ length: PAGE_SIZE }).forEach(() => {
      const movieItemTemplate = Skeleton.template();
      fragment.append(movieItemTemplate);
    });

    this.movieListBox.append(fragment);
  }

  renderMovieList(movieList: Movie[]) {
    if (!movieList.length) {
      return NotFound();
    }

    const fragment = new DocumentFragment();
    movieList.forEach(movie => {
      const movieItem = new MovieItem();
      movieItem.render(movie, (movieData: MovieDetailAPI) => {
        this.movieDetailModal.toggle();
        this.movieDetailModal.rerender(movieData);
      });
      fragment.append(movieItem.item);
    });

    this.movieListBox.append(fragment);
  }
}

export default MovieList;
