import MovieItem from '../MovieItem/MovieItem';
import { Movie } from './../../types/movie';
import { PAGE_SIZE } from '../../consts/common';
import '../MovieList/MovieList.css';
import MovieDetailModal from '../Modal/MovieDetailModal';
import { MovieDetailAPI } from '../../domain/services/API.type';
import Skeleton from '../Skeleton/Skeleton';

interface Props {
  movieList: Movie[];
  isLoading: boolean;
}

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
    const fragment = new DocumentFragment();
    movieList.forEach(movie => {
      const movieItem = new MovieItem().template(movie, (movieData: MovieDetailAPI) => {
        this.movieDetailModal.toggle();
        this.movieDetailModal.rerender(movieData);
      });
      fragment.append(movieItem);
    });

    this.movieListBox.append(fragment);
  }
}

export default MovieList;
